import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import { LoginAuthReqDto, RegisterAuthReqDto } from '../dtos/req/auth.req.dto';
import { Transactional } from 'typeorm-transactional';
import { ExpectationFailedException } from 'src/common/exceptions/http.exception';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/common/configs/app.config';
import { UpdateProfileUserReqDto } from '../dtos/req/profile.req.dto';
import { RecombeeService } from 'src/external/services/recombee.service';

@Injectable()
export class ProfileService {
  constructor(
    private recombeeService: RecombeeService,

    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService<AppConfig>,
  ) {}

  @Transactional()
  async getProfile(jwtPayload: JwtPayload) {
    const { userId } = jwtPayload;

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Transactional()
  async updateProfile(dto: UpdateProfileUserReqDto, jwtPayload: JwtPayload) {
    const { avatar, facebook, name, zaloPhoneNumber, phoneNumber } = dto;
    const { userId } = jwtPayload;

    let user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    user = {
      ...user,
      avatar,
      facebook,
      zaloPhoneNumber,
      name,
      phoneNumber,
    };
    await this.userRepo.save(user);

    await this.recombeeService.updateUser(user);

    return user;
  }
}
