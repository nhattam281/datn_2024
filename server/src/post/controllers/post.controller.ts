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
  AuthenticateUser,
  CurrentJwtPayload,
} from 'src/common/decorators/auth.decorator';
import { DeleteMultipleByIdNumberReqDto } from 'src/common/dtos/req/delete-multiple-by-ids.req.dto';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import {
  GetListPostReqDto,
  GetMyPostReqDto,
  GetRecommendedPostReqDto,
  SavePostReqDto,
} from '../dtos/req/post.req.dto';
import { PostService } from '../services/post.service';

@Controller('post')
@ApiTags('Post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getList(@Query() query: GetListPostReqDto) {
    return this.postService.getList(query);
  }

  @Get('with-auth')
  @AuthenticateUser()
  getListWithAuth(
    @Query() query: GetListPostReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.postService.getListWithAuth(query, jwtPayload);
  }

  @Get('my-post')
  @AuthenticateUser()
  getMyPost(
    @Query() query: GetMyPostReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.postService.getMyPost(query, jwtPayload);
  }

  @Get('recommended')
  @AuthenticateUser()
  getRecommended(
    @Query() query: GetRecommendedPostReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.postService.getRecommended(query, jwtPayload);
  }

  @Get(':id')
  getDetail(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getDetail(id);
  }

  @Post()
  @AuthenticateUser()
  create(
    @Body() body: SavePostReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.postService.create(body, jwtPayload);
  }

  @Put(':id')
  @AuthenticateUser()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: SavePostReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.postService.update(id, body, jwtPayload);
  }

  @Delete('multiple')
  @AuthenticateUser()
  deleteMultiple(
    @Body() body: DeleteMultipleByIdNumberReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.postService.deleteMultiple(body, jwtPayload);
  }

  @Delete(':id')
  @AuthenticateUser()
  deleteSingle(
    @Param('id', ParseIntPipe) id: number,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.postService.deleteSingle(id, jwtPayload);
  }
}
