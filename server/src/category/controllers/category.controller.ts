import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { GetListCategoryReqDto } from '../dtos/req/category.req.dto';
import { CategoryService } from '../services/category.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getList(@Query() query: GetListCategoryReqDto) {
    return this.categoryService.getList(query);
  }

  @Get(':id')
  getDetail(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getDetail(id);
  }
}
