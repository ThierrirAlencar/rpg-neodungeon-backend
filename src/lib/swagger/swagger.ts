import { SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";
import {SwaggerDocumentOptions as opt} from "./swagger-document-options"

export const swaggerOptions: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

