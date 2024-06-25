import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { DeleteMultipleByIdNumberReqDto } from 'src/common/dtos/req/delete-multiple-by-ids.req.dto';
import { ExpectationFailedException } from 'src/common/exceptions/http.exception';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { RecombeeService } from 'src/external/services/recombee.service';
import { File } from 'src/file/entities/file.entity';
import { PostReaction } from 'src/post/entities/post-reaction.entity';
import { Post } from 'src/post/entities/post.entity';
import { PostService } from 'src/post/services/post.service';
import { Brackets, In, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { GetListUserAdminReqDto } from '../dtos/req/user.admin.req.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserAdminService {
  constructor(
    private recombeeSer: RecombeeService,
    private postService: PostService,

    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(File) private fileRepo: Repository<File>,
    @InjectRepository(PostReaction)
    private postReactionRepo: Repository<PostReaction>,
  ) {}

  @Transactional()
  async getList(dto: GetListUserAdminReqDto) {
    const { limit, page, isBlock } = dto;
    let { searchText } = dto;

    const qb = this.userRepo.createQueryBuilder('u');

    if (searchText) {
      searchText = `%${searchText.toLowerCase()}%`;
      qb.andWhere(
        new Brackets((qb2) => {
          qb2.andWhere(`LOWER(u.email) LIKE :searchText`, { searchText });
          qb2.orWhere(`LOWER(u.name) LIKE :searchText`, { searchText });
          qb2.orWhere(`LOWER(u.phoneNumber) LIKE :searchText`, { searchText });
        }),
      );
    }
    if (typeof isBlock === 'boolean') {
      qb.andWhere(`u.isBlock = :isBlock`, { isBlock });
    }

    const { items, meta } = await paginate(qb, { limit, page });

    const result = await Promise.all(
      items.map(async (item) => this.getDetail(item.id)),
    );
    return new Pagination(result, meta);
  }

  @Transactional()
  async getDetail(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) throw new ExpectationFailedException('User not found');
    return user;
  }

  @Transactional()
  async block(id: number) {
    const { affected } = await this.userRepo.update(id, { isBlock: true });
    if (!affected) throw new ExpectationFailedException('User not found');
  }

  @Transactional()
  async unblock(id: number) {
    const { affected } = await this.userRepo.update(id, { isBlock: false });
    if (!affected) throw new ExpectationFailedException('User not found');
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

  private async checkForDelete(ids: number | number[], userId: number) {}

  private async deleteWitRelations(ids: number | number[]) {
    if (typeof ids === 'number') ids = [ids];

    await Promise.all([this.postReactionRepo.delete({ userId: In(ids) })]);

    const posts = await this.postRepo.find({ where: { userId: In(ids) } });
    if (posts.length) {
      await this.postService.deleteWitRelations(posts.map((item) => item.id));
    }
    await this.fileRepo.delete({ userId: In(ids) });
    await this.userRepo.delete(ids);
  }
}
