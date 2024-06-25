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
import { ApiParam, ApiTags } from '@nestjs/swagger';
import {
  AuthenticateUser,
  CurrentJwtPayload,
} from 'src/common/decorators/auth.decorator';
import { DeleteMultipleByIdNumberReqDto } from 'src/common/dtos/req/delete-multiple-by-ids.req.dto';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { GetListPostReqDto, SavePostReqDto } from '../dtos/req/post.req.dto';
import { PostService } from '../services/post.service';
import { PostReactionService } from '../services/post-reaction.service';
import {
  GetListReactedPostReqDto,
  ReactPostReqDto,
} from '../dtos/req/post-reaction.req.dto';

@Controller('post-reaction')
@ApiTags('Post Reaction')
@AuthenticateUser()
export class PostReactionController {
  constructor(private postReactionService: PostReactionService) {}

  @Get('reacted-post')
  getList(
    @Query() query: GetListReactedPostReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.postReactionService.getList(query, jwtPayload);
  }

  @Post()
  @AuthenticateUser()
  react(
    @Body() body: ReactPostReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.postReactionService.react(body, jwtPayload);
  }

  @Delete(':id')
  @AuthenticateUser()
  @ApiParam({ name: 'id', description: 'PostId to un-react' })
  deleteSingle(
    @Param('id', ParseIntPipe) id: number,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.postReactionService.deleteSingle(id, jwtPayload);
  }
}
