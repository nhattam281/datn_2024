import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryAdminController } from './controllers/category.admin.controller';
import { CategoryAdminService } from './services/category.admin.service';
import { Post } from 'src/post/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Post])],
  controllers: [CategoryController, CategoryAdminController],
  providers: [CategoryService, CategoryAdminService],
})
export class CategoryModule {}
