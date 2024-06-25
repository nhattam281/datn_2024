import {
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GetListProvinceReqDto } from '../dtos/req/province.req.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProvinceService } from '../services/province.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('province')
@ApiTags('Province')
export class ProvinceController {
  constructor(private provinceService: ProvinceService) {}

  @Get()
  getList(@Query() query: GetListProvinceReqDto) {
    return this.provinceService.getList(query);
  }

  @Get(':id')
  getDetail(@Param('id', ParseIntPipe) id: number) {
    return this.provinceService.getDetail(id);
  }

  @Post('import')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
    required: true,
  })
  @UseInterceptors(FileInterceptor('file'))
  import(
    @UploadedFile()
    // new ParseFilePipe({
    //   validators: [new MaxFileSizeValidator({ maxSize: 2000000 })],
    // }),
    file: Express.Multer.File,
  ) {
    return this.provinceService.handleImport(file);
  }
}
