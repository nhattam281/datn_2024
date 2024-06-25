import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  AuthenticateUser,
  CurrentJwtPayload,
} from 'src/common/decorators/auth.decorator';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { FileService } from '../services/file.service';

@Controller('file')
@ApiTags('File')
@AuthenticateUser()
export class FileController {
  constructor(private fileService: FileService) {}

  @Post()
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
  create(
    @UploadedFile() file: Express.Multer.File,
    @CurrentJwtPayload() jwtPayload: JwtPayload,
  ) {
    return this.fileService.uploadFile(file, jwtPayload);
  }
}
