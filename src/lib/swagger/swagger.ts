import { SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";

export const swaggerOptions: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

