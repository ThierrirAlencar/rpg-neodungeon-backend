import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerOptions } from './lib/swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cors Policy (temporary solution, should be improved in the future)
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
  const documentFactory = () => SwaggerModule.createDocument(app, {
    openapi: '3.0.0',
    info: {
      title: 'NeoDungeon API',
      version: '1.0.0',
      description: 'API documentation for NeoDungeon',
      license:{
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      },
      contact:{
        name: 'NeoDungeon Team',
        email: "contact@neodungeon.com"
      }
    },
  }, swaggerOptions);
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(3000);
}
bootstrap();
