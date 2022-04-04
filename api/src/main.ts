import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.SERVER_PORT || 3000;

  const whitelist = ['http://localhost:3000', 'http://localhost:5000'];
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  const config = new DocumentBuilder()
    .setTitle(`Postify Social Media`)
    .setDescription(`Ryan's Silly Little App`)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix('api/v1');
  await app.listen(port, () => {
    console.log(`app running on ${port}`);
  });
}
bootstrap();
