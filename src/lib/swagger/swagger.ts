import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";

export const swaggerOptions: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

export const config = new DocumentBuilder()
    .setOpenAPIVersion("3.2.0")
    .setTitle("NeoDungeon API Documentation")
    .setContact("Thierrir Alencar", "https://github.com/ThierrirAlencar", "thierrir.alencar.dev@gmail.com")
    .setDescription("A full RPG Sheet Manager API for Neo Dungeon Plataform.")
    .addTag("Auth","authentication routes", undefined , {kind:"nav",summary:"authentication routes"})
    .addTag("user","user management routes", undefined , {kind:"nav",summary:"user management routes"})
    .addTag("templates","template information GETs", undefined , {kind:"nav",summary:"template information GETs"})
    .build()