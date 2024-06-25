import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { File } from 'src/file/entities/file.entity';
import { Brackets, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import {
  GetListReactedPostReqDto,
  ReactPostReqDto,
} from '../dtos/req/post-reaction.req.dto';
import { PostReaction } from '../entities/post-reaction.entity';
import { Post } from '../entities/post.entity';
import { PostService } from './post.service';
import { RecombeeService } from 'src/external/services/recombee.service';

@Injectable()
export class PostReactionService {
  constructor(
    private recombeeService: RecombeeService,
    private postService: PostService,

    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(PostReaction)
    private postReactionRepo: Repository<PostReaction>,
  ) {}

  @Transactional()
  async getList(dto: GetListReactedPostReqDto, jwtPayload: JwtPayload) {
    const { limit, page } = dto;
    let { searchText } = dto;
    const { userId } = jwtPayload;

    const qb = this.postRepo
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.user', 'u')
      .innerJoin('p.postReactions', 'pr')
      .andWhere('pr.userId = :userId', { userId })
      .orderBy('pr.id', 'DESC')
      .andWhere('u.isBlock = false')
      .andWhere('p.isBlock = false');

    if (searchText) {
      searchText = `%${searchText.toLowerCase()}%`;
      qb.andWhere(
        new Brackets((qb2) => {
          qb2.andWhere(`LOWER(p.title) LIKE :searchText`, { searchText });
          qb2.orWhere(`LOWER(p.desc) LIKE :searchText`, { searchText });
        }),
      );
    }

    const { items, meta } = await paginate(qb, { limit, page });
    const postDetails = await Promise.all(
      items.map(async (item) => this.postService.getDetail(Number(item.id))),
    );

    const result = [];

    const postMetadata = await this.postService.getPostMetadata(
      items.map((item) => item.id),
      userId,
    );
    for (const postDetail of postDetails) {
      result.push({ ...postDetail, metadata: postMetadata[postDetail.id] });
    }

    return new Pagination(result, meta);
  }

  @Transactional()
  async react(dto: ReactPostReqDto, jwtPayload: JwtPayload) {
    const { postId, type } = dto;
    const { userId } = jwtPayload;

    const postReaction = this.postReactionRepo.create({
      postId,
      type,
      userId,
    });
    await this.postReactionRepo.save(postReaction);

    this.recombeeService.likePost(userId, postId);
  }

  @Transactional()
  async deleteSingle(id: number, jwtPayload: JwtPayload) {
    await this.postReactionRepo.delete({
      postId: id,
      userId: jwtPayload.userId,
    });

    this.recombeeService.dislikePost(jwtPayload.userId, id);
  }
}
