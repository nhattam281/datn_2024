import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { RecombeeService } from 'src/external/services/recombee.service';
import { Brackets, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { GetListPostReactionAdminReqDto } from '../dtos/req/post-reaction.admin.req.dto';
import { PostReaction } from '../entities/post-reaction.entity';
import { Post } from '../entities/post.entity';
import { PostService } from './post.service';

@Injectable()
export class PostReactionAdminService {
  constructor(
    private recombeeService: RecombeeService,
    private postService: PostService,

    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(PostReaction)
    private postReactionRepo: Repository<PostReaction>,
  ) {}

  @Transactional()
  async getList(dto: GetListPostReactionAdminReqDto) {
    const { limit, page, userId } = dto;

    let { searchText } = dto;

    const qb = this.postRepo
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.user', 'u')
      .innerJoin('p.postReactions', 'pr')
      .orderBy('pr.id', 'DESC');

    if (searchText) {
      searchText = `%${searchText.toLowerCase()}%`;
      qb.andWhere(
        new Brackets((qb2) => {
          qb2.andWhere(`LOWER(p.name) LIKE :searchText`, { searchText });
          qb2.orWhere(`LOWER(p.desc) LIKE :searchText`, { searchText });
        }),
      );
    }

    if (userId) {
      qb.andWhere(`pr.userId = :userId`, { userId });
    }

    const { items, meta } = await paginate(qb, { limit, page });
    const postDetails = await Promise.all(
      items.map(async (item) => this.postService.getDetail(Number(item.id))),
    );

    return new Pagination(postDetails, meta);
  }
}
