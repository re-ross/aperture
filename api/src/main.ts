import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const whitelist = ['http://localhost:3333', 'http://localhost:3000'];
  const port = process.env.SERVER_PORT || 3333;
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });
  const config = new DocumentBuilder()
    .setTitle(`Aperture - Photo Gallery App`)
    .setDescription(``)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(port, () => {
    console.log(`app running on ${port}`);
  });
}
bootstrap();
