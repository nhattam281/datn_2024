import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { keyBy } from 'lodash';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { DeleteMultipleByIdNumberReqDto } from 'src/common/dtos/req/delete-multiple-by-ids.req.dto';
import { ExpectationFailedException } from 'src/common/exceptions/http.exception';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { RecombeeService } from 'src/external/services/recombee.service';
import { File } from 'src/file/entities/file.entity';
import { Province } from 'src/province/entities/province.entity';
import { ProvinceType } from 'src/province/enums/province.enum';
import { Brackets, In, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { POST_EXPIRATION_IN_HOURS } from '../constants/post.constant';
import {
  GetListPostReqDto,
  GetListPostReqDtoOrderByEnum,
  GetMyPostReqDto,
  GetRecommendedPostReqDto,
  SavePostReqDto,
} from '../dtos/req/post.req.dto';
import { PostImage } from '../entities/post-image.entity';
import { PostReaction } from '../entities/post-reaction.entity';
import { Post } from '../entities/post.entity';
import { SavedPost } from '../entities/saved-post.entity';
import { PostReactionType } from '../enums/post-reaction.enum';

@Injectable()
export class PostService {
  constructor(
    private recombeeService: RecombeeService,

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
  async getList(dto: GetListPostReqDto) {
    const {
      categoryId,
      districtId,
      limit,
      maxArea,
      maxPrice,
      minArea,
      minPrice,
      orderBy,
      orderDirection,
      page,
      provinceId,
      wardId,
    } = dto;
    let { searchText } = dto;

    const qb = this.postRepo
      .createQueryBuilder('p')
      .andWhere('p.expiresAt >= now()')
      .innerJoinAndSelect('p.user', 'u')
      .andWhere('p.isBlock = false')
      .andWhere('u.isBlock = false');

    if (searchText) {
      searchText = `%${searchText.toLowerCase()}%`;
      qb.andWhere(
        new Brackets((qb2) => {
          qb2.andWhere(`LOWER(p.title) LIKE :searchText`, { searchText });
          qb2.orWhere(`LOWER(p.desc) LIKE :searchText`, { searchText });
        }),
      );
    }
    if (categoryId) {
      qb.andWhere(`p.categoryId = :categoryId`, { categoryId });
    }
    if (typeof minPrice === 'number') {
      qb.andWhere(`p.price >= :minPrice`, { minPrice });
    }
    if (typeof maxPrice === 'number') {
      qb.andWhere(`p.price <= :maxPrice`, { maxPrice });
    }
    if (typeof minArea === 'number') {
      qb.andWhere(`p.area >= :minArea`, { minArea });
    }
    if (typeof maxArea === 'number') {
      qb.andWhere(`p.area <= :maxArea`, { maxArea });
    }
    if (provinceId) {
      qb.andWhere(`p.provinceId = :provinceId`, { provinceId });
    }
    if (districtId) {
      qb.andWhere(`p.districtId = :districtId`, { districtId });
    }
    if (wardId) {
      qb.andWhere(`p.wardId = :wardId`, { wardId });
    }
    switch (orderBy) {
      case GetListPostReqDtoOrderByEnum.CREATED_DATE:
        qb.orderBy('p.createdAt', orderDirection === 'asc' ? 'ASC' : 'DESC');
        break;
    }

    const { items, meta } = await paginate(qb, { limit, page });

    const result = await Promise.all(
      items.map(async (item) => this.getDetail(item.id)),
    );
    return new Pagination(result, meta);
  }

  @Transactional()
  async getListWithAuth(dto: GetListPostReqDto, jwtPayload: JwtPayload) {
    const {
      categoryId,
      districtId,
      limit,
      maxArea,
      maxPrice,
      minArea,
      minPrice,
      orderBy,
      orderDirection,
      page,
      provinceId,
      wardId,
    } = dto;
    let { searchText } = dto;
    const { userId } = jwtPayload;

    const qb = this.postRepo
      .createQueryBuilder('p')
      .andWhere('p.expiresAt >= now()')
      .innerJoinAndSelect('p.user', 'u')
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
    if (categoryId) {
      qb.andWhere(`p.categoryId = :categoryId`, { categoryId });
    }
    if (typeof minPrice === 'number') {
      qb.andWhere(`p.price >= :minPrice`, { minPrice });
    }
    if (typeof maxPrice === 'number') {
      qb.andWhere(`p.price <= :maxPrice`, { maxPrice });
    }
    if (typeof minArea === 'number') {
      qb.andWhere(`p.area >= :minArea`, { minArea });
    }
    if (typeof maxArea === 'number') {
      qb.andWhere(`p.area <= :maxArea`, { maxArea });
    }
    if (provinceId) {
      qb.andWhere(`p.provinceId = :provinceId`, { provinceId });
    }
    if (districtId) {
      qb.andWhere(`p.districtId = :districtId`, { districtId });
    }
    if (wardId) {
      qb.andWhere(`p.wardId = :wardId`, { wardId });
    }
    switch (orderBy) {
      case GetListPostReqDtoOrderByEnum.CREATED_DATE:
        qb.orderBy('p.createdAt', orderDirection === 'asc' ? 'ASC' : 'DESC');
        break;
    }

    const { items, meta } = await paginate(qb, { limit, page });
    const postDetails = await Promise.all(
      items.map(async (item) => this.getDetail(item.id)),
    );

    const result = [];
    const postMetadata = await this.getPostMetadata(
      items.map((item) => item.id),
      userId,
    );

    for (const postDetail of postDetails) {
      result.push({ ...postDetail, metadata: postMetadata[postDetail.id] });
    }

    return new Pagination(result, meta);
  }

  @Transactional()
  async getMyPost(dto: GetMyPostReqDto, jwtPayload: JwtPayload) {
    const { isExpired, limit, page } = dto;
    let { searchText } = dto;
    const { userId } = jwtPayload;

    const qb = this.postRepo
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.user', 'u')
      .andWhere('p.isBlock = false')
      .andWhere('p.userId = :userId', { userId });

    if (searchText) {
      searchText = `%${searchText.toLowerCase()}%`;
      qb.andWhere(
        new Brackets((qb2) => {
          qb2.andWhere(`LOWER(p.title) LIKE :searchText`, { searchText });
          qb2.orWhere(`LOWER(p.desc) LIKE :searchText`, { searchText });
        }),
      );
    }

    if (isExpired) {
      qb.andWhere(`p.expiresAt <= now()`);
    }

    const { items, meta } = await paginate(qb, { limit, page });
    const postDetails = await Promise.all(
      items.map(async (item) => this.getDetail(item.id)),
    );
    const result = [];

    const postMetadata = await this.getPostMetadata(
      items.map((item) => item.id),
      userId,
    );
    for (const postDetail of postDetails) {
      result.push({ ...postDetail, metadata: postMetadata[postDetail.id] });
    }

    return new Pagination(result, meta);
  }

  @Transactional()
  async getDetail(id: number) {
    return this.postRepo.findOneOrFail({
      where: { id, user: { isBlock: false }, isBlock: false },
      relations: {
        province: true,
        district: true,
        ward: true,
        video: true,
        user: true,
        category: true,
        postImages: {
          image: true,
        },
      },
    });
  }

  async getRecommended(dto: GetRecommendedPostReqDto, jwtPayload: JwtPayload) {
    const { amount } = dto;
    const { userId } = jwtPayload;

    const { recomms } = await this.recombeeService.getRecommendedPost(
      userId,
      amount,
    );

    const postDetailResults = await Promise.allSettled(
      recomms.map(async (item) => this.getDetail(Number(item.id))),
    );
    const postDetails = postDetailResults
      .map((item) => (item.status === 'fulfilled' ? item.value : null))
      .filter(Boolean);

    const result = [];

    const postMetadata = await this.getPostMetadata(
      postDetails.map((item) => item.id),
      userId,
    );
    for (const postDetail of postDetails) {
      result.push({ ...postDetail, metadata: postMetadata[postDetail.id] });
    }

    return result;
  }

  @Transactional()
  async create(dto: SavePostReqDto, jwtPayload: JwtPayload) {
    const {
      address,
      area,
      desc,
      districtId,
      price,
      provinceId,
      title,
      wardId,
      gender,
      videoId,
      categoryId,
    } = dto;
    const { userId } = jwtPayload;

    const { images } = await this.validateRelations(dto, userId);

    const post = this.postRepo.create({
      address,
      area,
      categoryId,
      desc,
      districtId,
      expiresAt: dayjs().add(POST_EXPIRATION_IN_HOURS, 'hour').toDate(),
      gender,
      price,
      provinceId,
      title,
      userId,
      videoId,
      wardId,
    });
    await this.postRepo.save(post);

    await this.savePostImages([], images, post.id);

    const result = await this.getDetail(post.id);

    this.recombeeService.createPost(result);
    return result;
  }

  @Transactional()
  async update(id: number, dto: SavePostReqDto, jwtPayload: JwtPayload) {
    const {
      address,
      area,
      desc,
      districtId,
      price,
      provinceId,
      title,
      wardId,
      gender,
      videoId,
      categoryId,
    } = dto;
    const { userId } = jwtPayload;

    let post = await this.postRepo.findOneOrFail({
      where: { id, userId },
      relations: { postImages: true },
    });

    const { images } = await this.validateRelations(dto, userId);

    post = this.postRepo.create({
      ...post,
      address,
      area,
      categoryId,
      desc,
      districtId,
      gender,
      price,
      provinceId,
      title,
      userId,
      videoId,
      wardId,
    });

    await this.postRepo.save(post);
    await this.savePostImages(post.postImages, images, post.id);
    return this.getDetail(post.id);
  }

  private async validateRelations(dto: SavePostReqDto, userId: number) {
    const { districtId, imageIds, provinceId, wardId, videoId, categoryId } =
      dto;

    const [province, district, ward, images, video, category] =
      await Promise.all([
        this.provinceRepo.findOneByOrFail({
          id: provinceId,
          type: ProvinceType.PROVINCE,
        }),
        this.provinceRepo.findOneByOrFail({
          id: districtId,
          type: ProvinceType.DISTRICT,
        }),
        this.provinceRepo.findOneByOrFail({
          id: wardId,
          type: ProvinceType.WARD,
        }),
        this.fileRepo.findBy({ id: In(imageIds), userId }),
        videoId && this.fileRepo.findOneByOrFail({ id: videoId, userId }),
        this.categoryRepo.findOneByOrFail({ id: categoryId }),
      ]);

    if (district.parentId !== provinceId)
      throw new ExpectationFailedException('district.parentId !== province.id');
    if (ward.parentId !== districtId)
      throw new ExpectationFailedException('district.parentId !== province.id');

    if (images.length !== imageIds.length)
      throw new ExpectationFailedException('images.length !== imageIds.length');

    return { province, district, ward, images, video, category };
  }

  private async savePostImages(
    entities: PostImage[],
    dtos: File[],
    postId: number,
  ) {
    const entitiesToSave: PostImage[] = [];
    const entitiesToRemove: PostImage[] = [];

    for (const entity of entities) {
      const dto = dtos.find((item) => item.id === entity.imageId);

      if (!dto) {
        entitiesToRemove.push(entity);
      }
    }

    for (const dto of dtos) {
      let entity = entities.find((item) => item.imageId === dto.id);

      if (!entity) {
        entity = this.postImageRepo.create({
          postId,
          imageId: dto.id,
        });
        entitiesToSave.push(entity);
      }
    }

    await Promise.all([
      entitiesToRemove.length &&
        this.postImageRepo.softDelete(entitiesToRemove.map((item) => item.id)),
      entitiesToSave.length &&
        this.postImageRepo.save(entitiesToSave, {
          chunk: 100,
        }),
    ]);

    return entitiesToSave;
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

    const posts = await this.postRepo.find({ where: { id: In(ids), userId } });
    if (posts.length !== ids.length)
      throw new ExpectationFailedException('posts.length !== ids.length');
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

  async getPostMetadata(postIds: number[], userId: number) {
    const [savedPosts, postReactions] = await Promise.all([
      this.savedPostRepo.find({
        where: { postId: In(postIds), userId },
      }),
      this.postReactionRepo.find({
        where: { postId: In(postIds), userId },
      }),
    ]);

    const result: Record<
      string,
      {
        isSaved: boolean;
        reactionType: PostReactionType | null;
      }
    > = {};

    const savedPostMap = keyBy(savedPosts, (item) => item.postId);
    const postReactionMap = keyBy(postReactions, (item) => item.postId);

    for (const postId of postIds) {
      result[postId] = {
        isSaved: Boolean(savedPostMap[postId]),
        reactionType: postReactionMap[postId]?.type || null,
      };
    }

    return result;
  }
}
