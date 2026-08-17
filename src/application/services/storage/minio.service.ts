import { Injectable, OnModuleInit } from "@nestjs/common";
import * as Minio from "minio";
import { ConfigService } from "@nestjs/config";
import { MINIO_ACCESS_KEY, MINIO_HOST, MINIO_SECRET_KEY, MINIO_BUCKET_NAME } from "../../../lib/env/index.js";
import {Express} from "express";
import { Multer } from "multer" ;
import { MulterUploadError } from "../../../domain/errors/multerErrors.js";
 
@Injectable()
export class MinIoService implements OnModuleInit {
    private readonly minioClient: Minio.Client;
    private readonly bucketName: string

    constructor() {
        this.minioClient = new Minio.Client({
            endPoint: MINIO_HOST,
            port: 9000,
            useSSL:false,
            accessKey: MINIO_ACCESS_KEY,
            secretKey: MINIO_SECRET_KEY
        })

        this.bucketName = MINIO_BUCKET_NAME;
    }

    async onModuleInit() {
        const bucketExists = await this.minioClient.bucketExists(this.bucketName);
        if (!bucketExists) {
            await this.minioClient.makeBucket(this.bucketName, "us-east-1");
            try{
                console.log(`Bucket ${this.bucketName} created successfully.`);
            }catch(err){
                console.error(`Error creating bucket ${this.bucketName}:`, err);
            }
        } else {
            console.log(`Bucket ${this.bucketName} already exists.`);
        }
    }


    async upload(
        file:Express.Multer.File,
        objectName: string,
        metadata?: Record<string, unknown>,
    ):Promise<string>{
        const promissedObjectInfo = await this.minioClient.putObject(
            this.bucketName,
            objectName,
            file.buffer,
            file.size,
            {
                "Content-Type":file.mimetype
            }
        )

        if(!promissedObjectInfo){
            throw new MulterUploadError(objectName,String(file.size),file.mimetype)
        }

        //Gives back something cool
        return promissedObjectInfo.etag
    }

    async download(){

    }
}