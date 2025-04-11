import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerService } from '@common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    .useGlobalFilters(new HttpExceptionFilter())
    .setGlobalPrefix('api')
    .enableCors();

  const config = new DocumentBuilder()
    .setTitle('CredPal Assessment API Documentation')
    .setDescription(
      'API documentation of Credpal Assessment by Joshua Akhidenor',
    )
    .build();
  const document = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.getHttpAdapter().get('/api/docs/json', (req, res) => {
    res.json(document);
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3000;
  app.listen(port)
  Logger.log(`Application is running on port ${port}`);
}
bootstrap();
