import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { AppConfig } from 'src/common/configs/app.config';
import { DeleteMultipleByIdNumberReqDto } from 'src/common/dtos/req/delete-multiple-by-ids.req.dto';
import { ExpectationFailedException } from 'src/common/exceptions/http.exception';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { Brackets, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import {
  CreateAdminReqDto,
  GetListAdminReqDto,
  LoginAdminReqDto,
  UpdateAdminReqDto,
  UpdateMyPasswordAdminReqDto,
} from '../dtos/req/admin.req.dto';
import { Admin } from '../entities/admin.entity';
import { AdminRole } from '../enums/admin.enum';

@Injectable()
export class AdminService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<AppConfig>,

    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
  ) {}

  @Transactional()
  async getList(dto: GetListAdminReqDto) {
    const { limit, page } = dto;
    let { searchText } = dto;

    const qb = this.adminRepo
      .createQueryBuilder('a')
      .andWhere('a.role = :role', { role: AdminRole.ADMIN });

    if (searchText) {
      searchText = `%${searchText.toLowerCase()}%`;
      qb.andWhere(
        new Brackets((qb2) => {
          qb2.andWhere(`LOWER(a.name) LIKE :searchText`, { searchText });
        }),
      );
    }

    const { items, meta } = await paginate(qb, { limit, page });

    let result = await Promise.all(
      items.map(async (item) => this.getDetail(item.id)),
    );

    result.forEach((item) => {
      delete item.password;
    });

    return new Pagination(result, meta);
  }

  @Transactional()
  async getDetail(id: number) {
    const admin = await this.adminRepo.findOne({
      where: { id },
    });

    if (!admin) throw new ExpectationFailedException('Admin not found');
    return admin;
  }

  @Transactional()
  async getProfile(jwtPayload: JwtPayload) {
    const { userId } = jwtPayload;

    const admin = await this.adminRepo.findOne({ where: { id: userId } });
    if (!admin) throw new ExpectationFailedException('Admin not found');

    return admin;
  }

  @Transactional()
  async login(dto: LoginAdminReqDto) {
    const { email, password } = dto;

    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) throw new ExpectationFailedException('Admin not found');

    const isMatchPassword = await compare(password, admin.password);
    if (!isMatchPassword)
      throw new ExpectationFailedException('Wrong password');

    const payload: JwtPayload = { userId: admin.id, adminRole: admin.role };
    const accessToken = this.generateAccessToken(payload);

    return { accessToken };
  }

  @Transactional()
  async create(dto: CreateAdminReqDto) {
    const { name, email, password } = dto;

    const existAdmin = await this.adminRepo.findOne({ where: { email } });
    if (existAdmin) throw new ConflictException('Email is already in use');

    const hashedPassword = await hash(password, 12);

    const admin = this.adminRepo.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.adminRepo.save(admin);
    return this.getDetail(admin.id);
  }

  @Transactional()
  async update(id: number, dto: UpdateAdminReqDto) {
    const { name, password } = dto;

    let admin = await this.adminRepo.findOneOrFail({
      where: { id },
    });

    admin = this.adminRepo.create({
      ...admin,
      name,
      ...(password && { password: await hash(password, 12) }),
    });

    await this.adminRepo.save(admin);
    return this.getDetail(admin.id);
  }

  @Transactional()
  async updateMyInfo(dto: UpdateAdminReqDto, jwtPayload: JwtPayload) {
    const { name, password } = dto;
    const { userId } = jwtPayload;

    let admin = await this.adminRepo.findOneOrFail({
      where: { id: userId },
    });

    admin = this.adminRepo.create({
      ...admin,
      name,
      ...(password && { password: await hash(password, 12) }),
    });

    await this.adminRepo.save(admin);
    return this.getDetail(admin.id);
  }

  @Transactional()
  async updateMyPassword(
    dto: UpdateMyPasswordAdminReqDto,
    jwtPayload: JwtPayload,
  ) {
    const { newPassword, oldPassword } = dto;
    const { userId } = jwtPayload;

    let admin = await this.adminRepo.findOneOrFail({
      where: { id: userId },
    });

    const isMatchPassword = await compare(oldPassword, admin.password);
    if (!isMatchPassword)
      throw new ExpectationFailedException('Wrong password');

    admin = this.adminRepo.create({
      ...admin,
      password: await hash(newPassword, 12),
    });

    await this.adminRepo.save(admin);
    return this.getDetail(admin.id);
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

    await this.adminRepo.delete(ids);
  }

  private generateAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('auth.accessToken.expiresTime'),
      secret: this.configService.get('auth.accessToken.secret'),
      algorithm: this.configService.get('auth.accessToken.algorithm'),
    });
  }
}
