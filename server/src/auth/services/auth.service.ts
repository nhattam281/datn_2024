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
import { RecombeeService } from 'src/external/services/recombee.service';

@Injectable()
export class AuthService {
  constructor(
    private recombeeService: RecombeeService,

    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService<AppConfig>,
  ) {}

  @Transactional()
  async login(dto: LoginAuthReqDto) {
    const { email, password } = dto;

    const user = await this.userRepo.findOneBy({ email, isBlock: false });

    if (!user) throw new NotFoundException('User not found');

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      throw new ExpectationFailedException('Password not matches');
    }

    const payload: JwtPayload = { userId: user.id };
    const accessToken = this.generateAccessToken(payload);

    return { accessToken };
  }

  async register(dto: RegisterAuthReqDto) {
    const { email, name, password } = dto;

    let user = await this.userRepo.findOneBy({ email });
    if (user)
      throw new ConflictException('User with this email already existed');

    const hash = await bcrypt.hash(password, 12);

    user = this.userRepo.create({
      email,
      password: hash,
      name,
    });
    await this.userRepo.save(user);

    const payload: JwtPayload = { userId: user.id };
    const accessToken = this.generateAccessToken(payload);

    this.recombeeService.createUser(user);

    return { accessToken };
  }

  private generateAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('auth.accessToken.expiresTime'),
      secret: this.configService.get('auth.accessToken.secret'),
      algorithm: this.configService.get('auth.accessToken.algorithm'),
    });
  }
}
