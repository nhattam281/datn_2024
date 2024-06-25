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
  AuthenticateSuperAdmin,
  CurrentJwtPayload,
} from 'src/common/decorators/auth.decorator';
import { DeleteMultipleByIdNumberReqDto } from 'src/common/dtos/req/delete-multiple-by-ids.req.dto';
import { Serialize } from 'src/common/intercepters/serialize.interceptor';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import {
  CreateAdminReqDto,
  GetListAdminReqDto,
  LoginAdminReqDto,
  UpdateAdminReqDto,
  UpdateMyPasswordAdminReqDto,
} from '../dtos/req/admin.req.dto';
import { LoginAuthResDto } from '../dtos/res/auth.res.dto';
import { AdminService } from '../services/admin.service';
import { Admin } from '../entities/admin.entity';

@Controller(`admin/manage`)
@ApiTags('Admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  @AuthenticateSuperAdmin()
  getList(@Query() query: GetListAdminReqDto) {
    return this.adminService.getList(query);
  }

  @Get('profile')
  @AuthenticateAdmin()
  @Serialize(Admin)
  async getProfile(@CurrentJwtPayload() jwtPayload: JwtPayload) {
    return this.adminService.getProfile(jwtPayload);
  }

  @Get(':id')
  @AuthenticateSuperAdmin()
  @Serialize(Admin)
  getDetail(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getDetail(id);
  }

  @Post('login')
  @Serialize(LoginAuthResDto)
  async login(@Body() body: LoginAdminReqDto) {
    return this.adminService.login(body);
  }

  @Put('info')
  @Serialize(Admin)
  @AuthenticateSuperAdmin()
  async updateMyInfo(
    @Body() body: UpdateAdminReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.adminService.updateMyInfo(body, jwtPayload);
  }

  @Put('my-password')
  @AuthenticateSuperAdmin()
  @Serialize(Admin)
  async updateMyPassword(
    @Body() body: UpdateMyPasswordAdminReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.adminService.updateMyPassword(body, jwtPayload);
  }

  @Post()
  @AuthenticateSuperAdmin()
  @Serialize(Admin)
  create(
    @Body() body: CreateAdminReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.adminService.create(body);
  }

  @Put(':id')
  @AuthenticateSuperAdmin()
  @Serialize(Admin)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAdminReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.adminService.update(id, body);
  }

  @Delete('multiple')
  @AuthenticateSuperAdmin()
  deleteMultiple(
    @Body() body: DeleteMultipleByIdNumberReqDto,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.adminService.deleteMultiple(body, jwtPayload);
  }

  @Delete(':id')
  @AuthenticateSuperAdmin()
  deleteSingle(
    @Param('id', ParseIntPipe) id: number,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.adminService.deleteSingle(id, jwtPayload);
  }
}
