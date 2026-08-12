import { NestFactory } from "@nestjs/core";
import { AppModule } from "../../app.module.js";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";


const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.REDIS,
  options: {
    host: 'localhost',
    port: 6379,
  },
});

(async ()=>{
    await app.listen()
})()