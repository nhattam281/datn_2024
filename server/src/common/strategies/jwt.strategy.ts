import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { StrategyName } from '../constants/guard.cosntant';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../configs/app.config';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  StrategyName.JWT_AUTHEN_USER,
) {
  constructor(private readonly configService: ConfigService<AppConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.accessToken.secret'),
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.userId };
  }
}
