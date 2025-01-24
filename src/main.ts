import helmet from '@fastify/helmet';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    cors: true,
    bufferLogs: true,
  });

  app.register(helmet);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  buildOpenApiDocs(app);

  await app.listen(process.env.PORT || 80, '0.0.0.0');
}

function buildOpenApiDocs(app: NestFastifyApplication) {
  const generalDocsConfig = new DocumentBuilder()
    .setTitle('Example docs')
    .setDescription('Api Documents')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const generalDocsDocument = SwaggerModule.createDocument(app, generalDocsConfig);

  SwaggerModule.setup('docs', app, generalDocsDocument);
}

bootstrap();
