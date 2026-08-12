import { Module } from "@nestjs/common";
import { MinIoService } from "../../application/services/storage/minio.service.js";


@Module({
    providers: [MinIoService],
    exports: [MinIoService]
})
export class MinIoModule {}
