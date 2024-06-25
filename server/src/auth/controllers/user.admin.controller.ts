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
  CurrentJwtPayload,
} from 'src/common/decorators/auth.decorator';
import { DeleteMultipleByIdNumberReqDto } from 'src/common/dtos/req/delete-multiple-by-ids.req.dto';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { GetListUserAdminReqDto } from '../dtos/req/user.admin.req.dto';
import { UserAdminService } from '../services/user.admin.service';

@Controller(`admin/user`)
@ApiTags('Admin User')
@AuthenticateAdmin()
export class UserAdminController {
  constructor(private userAdminService: UserAdminService) {}

  @Get()
  getList(@Query() query: GetListUserAdminReqDto) {
    return this.userAdminService.getList(query);
  }

  @Get(':id')
  getDetail(@Param('id', ParseIntPipe) id: number) {
    return this.userAdminService.getDetail(id);
  }

  @Post(':id/block')
  async block(@Param('id', ParseIntPipe) userId: number) {
    return this.userAdminService.block(userId);
  }

  @Post(':id/un-block')
  async unblock(@Param('id', ParseIntPipe) userId: number) {
    return this.userAdminService.unblock(userId);
  }

  @Delete('multiple')
  @AuthenticateAdmin()
  deleteMultiple(
    @Body() body: DeleteMultipleByIdNumberReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.userAdminService.deleteMultiple(body, jwtPayload);
  }

  @Delete(':id')
  @AuthenticateAdmin()
  deleteSingle(
    @Param('id', ParseIntPipe) id: number,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.userAdminService.deleteSingle(id, jwtPayload);
  }
}
