import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
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
  GetListPostAdminReqDto,
  GetRecommendedPostAdminReqDto,
} from '../dtos/req/post.admin.req.dto';
import { PostAdminService } from '../services/post.admin.service';

@Controller(`admin/post`)
@ApiTags('Admin Post')
@AuthenticateAdmin()
export class PostAdminController {
  constructor(private postAdminService: PostAdminService) {}

  @Get()
  getList(@Query() query: GetListPostAdminReqDto) {
    return this.postAdminService.getList(query);
  }

  @Get('recomemended')
  getListRecommended(@Query() query: GetRecommendedPostAdminReqDto) {
    return this.postAdminService.getRecommended(query);
  }

  @Get(':id')
  getDetail(@Param('id', ParseIntPipe) id: number) {
    return this.postAdminService.getDetail(id);
  }

  @Post(':id/block')
  async block(@Param('id', ParseIntPipe) postId: number) {
    return this.postAdminService.block(postId);
  }

  @Post(':id/un-block')
  async unblock(@Param('id', ParseIntPipe) postId: number) {
    return this.postAdminService.unblock(postId);
  }

  @Delete('multiple')
  @AuthenticateUser()
  deleteMultiple(
    @Body() body: DeleteMultipleByIdNumberReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.postAdminService.deleteMultiple(body, jwtPayload);
  }

  @Delete(':id')
  @AuthenticateUser()
  deleteSingle(
    @Param('id', ParseIntPipe) id: number,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.postAdminService.deleteSingle(id, jwtPayload);
  }
}
