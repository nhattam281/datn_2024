import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticateAdmin } from 'src/common/decorators/auth.decorator';
import { GetListPostReactionAdminReqDto } from '../dtos/req/post-reaction.admin.req.dto';
import { PostReactionAdminService } from '../services/post-reaction.admin.service';

@Controller(`admin/post-reaction`)
@ApiTags('Admin Post Reaction')
@AuthenticateAdmin()
export class PostReactionAdminController {
  constructor(private postReactionAdminService: PostReactionAdminService) {}

  @Get()
  getList(@Query() query: GetListPostReactionAdminReqDto) {
    return this.postReactionAdminService.getList(query);
  }
}
