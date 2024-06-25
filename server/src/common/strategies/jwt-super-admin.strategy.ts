import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StrategyName } from '../constants/guard.cosntant';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../configs/app.config';
import { JwtPayload } from '../types/jwt-payload.type';
import { AdminRole } from 'src/auth/enums/admin.enum';

@Injectable()
export class JwtSuperAdminStrategy extends PassportStrategy(
  Strategy,
  StrategyName.JWT_AUTHEN_SUPER_ADMIN,
) {
  constructor(private readonly configService: ConfigService<AppConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.accessToken.secret'),
    });
  }

  async validate(payload: JwtPayload) {
    if (payload?.adminRole !== AdminRole.SUPER_ADMIN)
      throw new UnauthorizedException('You are not super admin');

    return { userId: payload.userId };
  }
}
