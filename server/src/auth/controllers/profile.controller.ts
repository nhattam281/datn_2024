import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '../../common/intercepters/serialize.interceptor';
import { LoginAuthResDto, RegisterAuthResDto } from '../dtos/res/auth.res.dto';
import { AuthService } from '../services/auth.service';
import { LoginAuthReqDto, RegisterAuthReqDto } from '../dtos/req/auth.req.dto';
import { ProfileService } from '../services/profile.service';
import {
  AuthenticateUser,
  CurrentJwtPayload,
} from 'src/common/decorators/auth.decorator';
import { User } from '../entities/user.entity';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { UpdateProfileUserReqDto } from '../dtos/req/profile.req.dto';

@ApiTags('Profile')
@Controller('profile')
@AuthenticateUser()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @Serialize(User)
  async getProfile(@CurrentJwtPayload() jwtPayload: JwtPayload) {
    return this.profileService.getProfile(jwtPayload);
  }

  @Put()
  @Serialize(User)
  async register(
    @Body() body: UpdateProfileUserReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.profileService.updateProfile(body, jwtPayload);
  }
}
