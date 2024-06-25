import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { ExternalModule } from 'src/external/external.module';
import { File } from 'src/file/entities/file.entity';
import { Province } from 'src/province/entities/province.entity';
import { PostReactionController } from './controllers/post-reaction.controller';
import { PostController } from './controllers/post.controller';
import { PostImage } from './entities/post-image.entity';
import { PostReaction } from './entities/post-reaction.entity';
import { Post } from './entities/post.entity';
import { SavedPost } from './entities/saved-post.entity';
import { PostReactionService } from './services/post-reaction.service';
import { PostService } from './services/post.service';
import { PostAdminService } from './services/post.admin.service';
import { PostReactionAdminService } from './services/post-reaction.admin.service';
import { PostAdminController } from './controllers/post.admin.controller';
import { PostReactionAdminController } from './controllers/post-reaction.admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post,
      Province,
      File,
      Category,
      User,
      PostReaction,
      SavedPost,
      PostImage,
    ]),
    ExternalModule,
  ],
  controllers: [
    PostController,
    PostReactionController,
    PostAdminController,
    PostReactionAdminController,
  ],
  providers: [
    PostService,
    PostReactionService,
    PostAdminService,
    PostReactionAdminService,
  ],
  exports: [PostService],
})
export class PostModule {}
