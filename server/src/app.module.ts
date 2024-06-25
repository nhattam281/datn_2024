require('./common/configs/dayjs.config');
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDataSource } from 'data-source';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from 'typeorm-transactional';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { appConfig } from './common/configs/app.config';
import { ProvinceModule } from './province/province.module';
import { PostModule } from './post/post.module';
import { FileModule } from './file/file.module';
import { ExternalModule } from './external/external.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => appConfig],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({}) as any,
      dataSourceFactory: async () => {
        initializeTransactionalContext();
        return addTransactionalDataSource(appDataSource);
      },
    }),
    AuthModule,
    CategoryModule,
    ProvinceModule,
    FileModule,
    PostModule,
    ExternalModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { exposeDefaultValues: true },
      }),
    },
  ],
})
export class AppModule {}
