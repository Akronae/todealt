import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app/app.module';
import { ConfigService } from '@/modules/config/config.service';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import metadata from './metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  await SwaggerModule.loadPluginMetadata(metadata);
  const confdoc = new DocumentBuilder()
    .setTitle('Dealt API')
    .setDescription('The Dealt API specification')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, confdoc);
  SwaggerModule.setup('docs', app, document);

  const port = config.getOrThrow('PORT');
  const logger = new Logger(bootstrap.name);
  logger.log(`Server listening on :${port}`);
  app.enableCors();
  await app.listen(port);
}
bootstrap();
