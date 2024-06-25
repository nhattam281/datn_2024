import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetListProvinceReqDto } from '../dtos/req/province.req.dto';
import { Province } from '../entities/province.entity';
import { Transactional } from 'typeorm-transactional';
import xlsx from 'xlsx';
import { ProvinceType } from '../enums/province.enum';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province) private provinceRepo: Repository<Province>,
  ) {}

  async getList(dto: GetListProvinceReqDto) {
    let { searchText, parentId, type } = dto;

    const qb = this.provinceRepo.createQueryBuilder('p').limit(1000);

    if (searchText) {
      searchText = `%${searchText}%`;
      qb.andWhere(`p.name LIKE :searchText`, { searchText });
    }
    if (parentId) {
      qb.andWhere(`p.parentId = :parentId`, { parentId });
    }
    if (type) {
      qb.andWhere(`p.type = :type`, { type });
    }

    const provinces = await qb.getMany();
    return provinces;
  }

  async getDetail(id: number) {
    return this.provinceRepo.findOneOrFail({ where: { id } });
  }

  @Transactional()
  async handleImport(file: Express.Multer.File) {
    const workbook = xlsx.read(file.buffer);

    for (const worksheet of Object.values(workbook.Sheets)) {
      const rows = xlsx.utils.sheet_to_json<any[]>(worksheet, { header: 1 });
      rows.shift();

      const provinces: Province[] = [];

      for (const row of rows) {
        const numCharacters = row[0]?.length;
        let province: Province;

        switch (numCharacters) {
          case 2:
            const provinceExist = await this.provinceRepo.findOneBy({
              code: row[0],
            });
            if (provinceExist) {
              province = { ...provinceExist, name: row[1] };
            } else {
              province = this.provinceRepo.create({
                code: row[0],
                name: row[1],
                type: ProvinceType.PROVINCE,
              });
            }
            provinces.push(province);
            break;
          case 3:
            const prov = await this.provinceRepo.findOneBy({
              code: row[4],
            });
            if (!prov) throw Error('Province not found');
            const distExist = await this.provinceRepo.findOneBy({
              code: row[0],
            });
            if (distExist) {
              province = { ...distExist, name: row[1], parentId: prov.id };
            } else {
              province = this.provinceRepo.create({
                code: row[0],
                name: row[1],
                type: ProvinceType.DISTRICT,
                parentId: prov.id,
              });
            }

            provinces.push(province);
            break;
          case 5:
            const dist = await this.provinceRepo.findOneBy({
              code: row[4],
            });
            if (!dist) throw Error('District not found');
            const wardExist = await this.provinceRepo.findOneBy({
              code: row[0],
            });
            if (wardExist) {
              province = {
                ...wardExist,
                name: row[1],
                parentId: dist.id,
              };
            } else {
              province = this.provinceRepo.create({
                code: row[0],
                name: row[1],
                type: ProvinceType.WARD,
                parentId: dist.id,
              });
            }

            provinces.push(province);
            break;

          default:
            console.log('row is not a province');
        }
      }

      await this.provinceRepo.save(provinces, { chunk: 10000 });
    }
  }
}
