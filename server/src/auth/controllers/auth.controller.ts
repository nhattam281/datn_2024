import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '../../common/intercepters/serialize.interceptor';
import { LoginAuthResDto, RegisterAuthResDto } from '../dtos/res/auth.res.dto';
import { AuthService } from '../services/auth.service';
import { LoginAuthReqDto, RegisterAuthReqDto } from '../dtos/req/auth.req.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Serialize(LoginAuthResDto)
  async login(@Body() body: LoginAuthReqDto) {
    return this.authService.login(body);
  }

  @Post('register')
  @Serialize(RegisterAuthResDto)
  async register(@Body() body: RegisterAuthReqDto) {
    return this.authService.register(body);
  }
}
