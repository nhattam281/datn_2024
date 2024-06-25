import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { ExpectationFailedException } from 'src/common/exceptions/http.exception';
import { RecombeeService } from 'src/external/services/recombee.service';
import { Post } from 'src/post/entities/post.entity';
import { Brackets, In, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import {
  GetListPostAdminReqDto,
  GetRecommendedPostAdminReqDto,
} from '../dtos/req/post.admin.req.dto';
import { PostService } from './post.service';
import { Province } from 'src/province/entities/province.entity';
import { Category } from 'src/category/entities/category.entity';
import { PostReaction } from '../entities/post-reaction.entity';
import { SavedPost } from '../entities/saved-post.entity';
import { PostImage } from '../entities/post-image.entity';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { DeleteMultipleByIdNumberReqDto } from 'src/common/dtos/req/delete-multiple-by-ids.req.dto';

@Injectable()
export class PostAdminService {
  constructor(
    private recombeeSer: RecombeeService,
    private postService: PostService,

    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Province) private provinceRepo: Repository<Province>,
    @InjectRepository(File) private fileRepo: Repository<File>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(PostReaction)
    private postReactionRepo: Repository<PostReaction>,
    @InjectRepository(SavedPost) private savedPostRepo: Repository<SavedPost>,
    @InjectRepository(PostImage) private postImageRepo: Repository<PostImage>,
  ) {}

  @Transactional()
  async getList(dto: GetListPostAdminReqDto) {
    const { limit, page, userId, isBlock } = dto;
    let { searchText } = dto;

    const qb = this.postRepo
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.user', 'u');

    if (searchText) {
      searchText = `%${searchText.toLowerCase()}%`;
      qb.andWhere(
        new Brackets((qb2) => {
          qb2.andWhere(`LOWER(p.title) LIKE :searchText`, { searchText });
          qb2.orWhere(`LOWER(p.desc) LIKE :searchText`, { searchText });
        }),
      );
    }
    if (userId) {
      qb.andWhere(`p.userId = :userId`, { userId });
    }
    if (typeof isBlock === 'boolean') {
      qb.andWhere(`p.isBlock = :isBlock`, { isBlock });
    }

    const { items, meta } = await paginate(qb, { limit, page });

    const result = await Promise.all(
      items.map(async (item) => this.getDetail(item.id)),
    );
    return new Pagination(result, meta);
  }

  @Transactional()
  async getDetail(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
    });

    if (!post) throw new ExpectationFailedException('Post not found');
    return post;
  }

  async getRecommended(dto: GetRecommendedPostAdminReqDto) {
    const { amount, userId } = dto;
    return this.postService.getRecommended({ amount }, { userId });
  }

  @Transactional()
  async block(id: number) {
    const { affected } = await this.postRepo.update(id, { isBlock: true });
    if (!affected) throw new ExpectationFailedException('post not found');
  }

  @Transactional()
  async unblock(id: number) {
    const { affected } = await this.postRepo.update(id, { isBlock: false });
    if (!affected) throw new ExpectationFailedException('post not found');
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
    return true;
  }

  async deleteWitRelations(ids: number | number[]) {
    if (typeof ids === 'number') ids = [ids];

    await Promise.all([
      this.postReactionRepo.delete({ postId: In(ids) }),
      this.savedPostRepo.delete({ postId: In(ids) }),
      this.postImageRepo.delete({ postId: In(ids) }),
    ]);

    await this.postRepo.delete(ids);
  }
}
