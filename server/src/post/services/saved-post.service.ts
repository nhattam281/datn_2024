// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Pagination, paginate } from 'nestjs-typeorm-paginate';
// import { JwtPayload } from 'src/common/types/jwt-payload.type';
// import { File } from 'src/file/entities/file.entity';
// import { Repository } from 'typeorm';
// import { Transactional } from 'typeorm-transactional';
// import {
//   GetListReactedPostReqDto,
//   ReactPostReqDto,
// } from '../dtos/req/post-reaction.req.dto';
// import { PostReaction } from '../entities/post-reaction.entity';
// import { Post } from '../entities/post.entity';
// import { GetListSavedPostReqDto } from '../dtos/req/saved-post.req.dto';
// import { SavedPost } from '../entities/saved-post.entity';
// import { PostService } from './post.service';
// import { SavePostReqDto } from '../dtos/req/post.req.dto';

// @Injectable()
// export class SavedPostService {
//   constructor(
//     private postService: PostService,

//     @InjectRepository(Post) private postRepo: Repository<Post>,
//     @InjectRepository(SavedPost)
//     private savedPostRepo: Repository<SavedPost>,
//   ) {}

//   @Transactional()
//   async getList(dto: GetListSavedPostReqDto, jwtPayload: JwtPayload) {
//     const { limit, page } = dto;
//     const { userId } = jwtPayload;

//     const qb = this.postRepo
//       .createQueryBuilder('p')
//       .innerJoinAndSelect('p.user', 'u')
//       .innerJoinAndSelect('p.province', 'province')
//       .innerJoinAndSelect('p.district', 'd')
//       .innerJoinAndSelect('p.ward', 'w')
//       .innerJoinAndSelect('p.image', 'i')
//       .leftJoinAndSelect('p.video', 'v')
//       .innerJoinAndSelect('p.category', 'c')
//       .innerJoin('p.savedPosts', 'sp')
//       .andWhere('sp.userId = :userId', { userId })
//       .orderBy('sp.id', 'DESC');

//     const { items, meta } = await paginate(qb, { limit, page });

//     const result = [];

//     const postMetadata = await this.postService.getPostMetadata(
//       items.map((item) => item.id),
//       userId,
//     );
//     for (const item of items) {
//       result.push({ ...item, metadata: postMetadata[item.id] });
//     }

//     return new Pagination(result, meta);
//   }

//   @Transactional()
//   async savePost(id: number, jwtPayload: JwtPayload) {
//     const { userId } = jwtPayload;

//     const savedPost = this.savedPostRepo.create({
//       postId: id,
//       userId,
//     });
//     await this.savedPostRepo.save(savedPost);
//   }

//   @Transactional()
//   async deleteSingle(id: number, jwtPayload: JwtPayload) {
//     await this.savedPostRepo.delete({
//       postId: id,
//       userId: jwtPayload.userId,
//     });
//   }
// }
