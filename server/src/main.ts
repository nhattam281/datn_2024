require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prefix = '/api';

  app.enableCors({ origin: '*' });
  app.setGlobalPrefix(prefix);

  const appName = `Phòng trọ UTC`;

  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(appName)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${prefix}/swagger`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const PORT = +process.env.PORT || 5000;

  await app.listen(PORT);
  console.log(`${appName} is listening at ${PORT}`);
}
bootstrap();
