import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { DeleteMultipleByIdNumberReqDto } from 'src/common/dtos/req/delete-multiple-by-ids.req.dto';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { Post } from 'src/post/entities/post.entity';
import { Brackets, In, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import {
  GetListCategoryAdminReqDto,
  SaveCategoryAdminReqDto,
} from '../dtos/req/category.admin.req.dto';
import { Category } from '../entities/category.entity';
import { ExpectationFailedException } from 'src/common/exceptions/http.exception';

@Injectable()
export class CategoryAdminService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
  ) {}

  @Transactional()
  async getList(dto: GetListCategoryAdminReqDto) {
    const { limit, page } = dto;
    let { searchText } = dto;

    const qb = this.categoryRepo.createQueryBuilder('c');

    if (searchText) {
      searchText = `%${searchText.toLowerCase()}%`;
      qb.andWhere(
        new Brackets((qb2) => {
          qb2.andWhere(`LOWER(c.name) LIKE :searchText`, { searchText });
          qb2.orWhere(`LOWER(c.desc) LIKE :searchText`, { searchText });
        }),
      );
    }

    const { items, meta } = await paginate(qb, { limit, page });

    const result = await Promise.all(
      items.map(async (item) => this.getDetail(item.id)),
    );
    return new Pagination(result, meta);
  }

  @Transactional()
  async getDetail(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
    });

    if (!category) throw new ExpectationFailedException('Category not found');
    return category;
  }

  @Transactional()
  async create(dto: SaveCategoryAdminReqDto, jwtPayload: JwtPayload) {
    const { desc, name } = dto;
    const { userId } = jwtPayload;

    const category = this.categoryRepo.create({ desc, name });
    await this.categoryRepo.save(category);

    const result = await this.getDetail(category.id);

    return result;
  }

  @Transactional()
  async update(
    id: number,
    dto: SaveCategoryAdminReqDto,
    jwtPayload: JwtPayload,
  ) {
    const { desc, name } = dto;

    let category = await this.categoryRepo.findOneOrFail({
      where: { id },
    });

    category = this.categoryRepo.create({
      ...category,
      name,
      desc,
    });

    await this.categoryRepo.save(category);
    return this.getDetail(category.id);
  }

  @Transactional()
  async deleteSingle(id: number, jwtPayload: JwtPayload) {
    await this.checkForDelete(id, jwtPayload.userId);
    await this.deleteWitRelations(id);
  }

  @Transactional()
  async deleteMultiple(
    dto: DeleteMultipleByIdNumberReqDto,
    jwtPayload: JwtPayload,
  ) {
    const { ids } = dto;
    await this.checkForDelete(ids, jwtPayload.userId);
    await this.deleteWitRelations(ids);
  }

  private async checkForDelete(ids: number | number[], userId: number) {
    if (typeof ids === 'number') ids = [ids];
  }

  private async deleteWitRelations(ids: number | number[]) {
    if (typeof ids === 'number') ids = [ids];

    await Promise.all([this.postRepo.delete({ categoryId: In(ids) })]);

    await this.categoryRepo.delete(ids);
  }
}
