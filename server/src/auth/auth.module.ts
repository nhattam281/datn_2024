import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAdminStrategy } from 'src/common/strategies/jwt-admin.strategy';
import { JwtSuperAdminStrategy } from 'src/common/strategies/jwt-super-admin.strategy';
import { ExternalModule } from 'src/external/external.module';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { AdminController } from './controllers/admin.controller';
import { AuthController } from './controllers/auth.controller';
import { ProfileController } from './controllers/profile.controller';
import { Admin } from './entities/admin.entity';
import { User } from './entities/user.entity';
import { AdminService } from './services/admin.service';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { UserAdminService } from './services/user.admin.service';
import { UserAdminController } from './controllers/user.admin.controller';
import { Post } from 'src/post/entities/post.entity';
import { PostModule } from 'src/post/post.module';
import { File } from 'src/file/entities/file.entity';
import { PostReaction } from 'src/post/entities/post-reaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Admin, Post, File, PostReaction]),
    PassportModule,
    JwtModule.register({}),
    ExternalModule,
    PostModule,
  ],
  controllers: [
    AuthController,
    ProfileController,
    AdminController,
    UserAdminController,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    ProfileService,
    AdminService,
    JwtAdminStrategy,
    JwtSuperAdminStrategy,
    UserAdminService,
  ],
  exports: [
    JwtStrategy,
    JwtAdminStrategy,
    JwtSuperAdminStrategy,
    UserAdminService,
  ],
})
export class AuthModule {}
