import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { StrategyName } from '../constants/guard.cosntant';
import { IS_PUBLIC_KEY } from '../decorators/auth.decorator';

@Injectable()
export class JwtAuthAdminGuard extends AuthGuard(
  StrategyName.JWT_AUTHEN_ADMIN,
) {
  constructor(private reflector: Reflector) {
    super();
  }

  async anActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    const result = await super.canActivate(context);
    return result;
  }

  handleRequest(err, user, info, context) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
