import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { INestApplication } from '@nestjs/common';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
    snapshot: true,
  });

  processSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
};
void bootstrap();

function processSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Backend API Documentation')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/api/docs',
    apiReference({
      content: document,
    }),
  );
}
