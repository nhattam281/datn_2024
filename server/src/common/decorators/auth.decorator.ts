import {
  ExecutionContext,
  SetMetadata,
  UseGuards,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { JwtAuthAdminGuard } from '../guards/jwt-auth-admin.guard';
import { JwtAuthSuperAdminGuard } from '../guards/jwt-auth-super-admin.guard';

export const AuthenticateUser = () =>
  applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth());

export const AuthenticateAdmin = () =>
  applyDecorators(UseGuards(JwtAuthAdminGuard), ApiBearerAuth());

export const AuthenticateSuperAdmin = () =>
  applyDecorators(UseGuards(JwtAuthSuperAdminGuard), ApiBearerAuth());

export const CurrentJwtPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const IS_PUBLIC_KEY = Symbol();
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
