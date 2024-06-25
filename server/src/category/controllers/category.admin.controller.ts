import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AuthenticateAdmin,
  AuthenticateUser,
  CurrentJwtPayload,
} from 'src/common/decorators/auth.decorator';
import { DeleteMultipleByIdNumberReqDto } from 'src/common/dtos/req/delete-multiple-by-ids.req.dto';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import {
  GetListCategoryAdminReqDto,
  SaveCategoryAdminReqDto,
} from '../dtos/req/category.admin.req.dto';
import { CategoryAdminService } from '../services/category.admin.service';

@Controller('admin/category')
@ApiTags('Admin Category')
@AuthenticateAdmin()
export class CategoryAdminController {
  constructor(private categoryAdminService: CategoryAdminService) {}

  @Get()
  getList(@Query() query: GetListCategoryAdminReqDto) {
    return this.categoryAdminService.getList(query);
  }

  @Get(':id')
  getDetail(@Param('id', ParseIntPipe) id: number) {
    return this.categoryAdminService.getDetail(id);
  }

  @Post()
  create(
    @Body() body: SaveCategoryAdminReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.categoryAdminService.create(body, jwtPayload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: SaveCategoryAdminReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.categoryAdminService.update(id, body, jwtPayload);
  }

  @Delete('multiple')
  deleteMultiple(
    @Body() body: DeleteMultipleByIdNumberReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.categoryAdminService.deleteMultiple(body, jwtPayload);
  }

  @Delete(':id')
  deleteSingle(
    @Param('id', ParseIntPipe) id: number,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.categoryAdminService.deleteSingle(id, jwtPayload);
  }
}
