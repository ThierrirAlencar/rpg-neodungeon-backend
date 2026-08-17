import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import { config as swaggerConfig, swaggerOptions } from './lib/swagger/swagger.js';
import { HOST, PORT } from './lib/env/index.js';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cors Policy (temporary solution, should be improved in the future)
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })


  
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig, swaggerOptions);

  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });


  await app.listen(PORT,HOST,()=>{
    console.log(`Server is running on http://${HOST}:${PORT}\nCheck api documentation at http://${HOST}:${PORT}/docs`);
    console.log('Cache stores initialized: Memory and Redis, running redis at: redis://localhost:6379');
  });
}
bootstrap();
