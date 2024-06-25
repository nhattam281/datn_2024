import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { GetListCategoryReqDto } from '../dtos/req/category.req.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async getList(dto: GetListCategoryReqDto) {
    let { searchText } = dto;

    const qb = this.categoryRepo.createQueryBuilder('c');

    if (searchText) {
      searchText = `%${searchText}%`;
      qb.andWhere(
        new Brackets((qb2) => {
          qb2.andWhere(`c.name LIKE :searchText`, { searchText });
          qb2.orWhere(`c.desc LIKE :searchText`, { searchText });
        }),
      );
    }

    const categories = await qb.getMany();
    return categories;
  }

  async getDetail(id: number) {
    return this.categoryRepo.findOneOrFail({ where: { id } });
  }
}
