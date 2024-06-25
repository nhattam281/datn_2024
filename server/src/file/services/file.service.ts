import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import cloudinary, { UploadApiOptions } from 'cloudinary';
import mime from 'mime-types';
import { AppConfig } from 'src/common/configs/app.config';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { File } from '../entities/file.entity';
import streamifier from 'streamifier';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private fileRepo: Repository<File>,
    private configService: ConfigService<AppConfig>,
  ) {}

  @Transactional()
  async uploadFile(file: Express.Multer.File, jwtPayload: JwtPayload) {
    const { userId } = jwtPayload;

    const { secure_url, public_id } = await this.handleUpFileToCloudinary(file);

    const fileEntity = this.fileRepo.create({
      url: secure_url,
      publicId: public_id,
      userId,
    });

    await this.fileRepo.save(fileEntity);

    return fileEntity;
  }

  private async handleUpFileToCloudinary(file: Express.Multer.File) {
    return await new Promise<cloudinary.UploadApiResponse>((res, rej) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        {
          upload_preset: this.configService.get('cloudinary.preset'),
          resource_type: this.getResourceType(file.mimetype),
          format: mime.extension(file.mimetype) || undefined,
        },
        (error, uploadResult) => {
          if (error) rej(error);

          res(uploadResult);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  }

  private getResourceType(mimetype: string): UploadApiOptions['resource_type'] {
    if (mimetype.includes('image')) return 'image';
    if (mimetype.includes('video')) return 'video';
    return 'raw';
  }
}
