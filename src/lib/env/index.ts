import "dotenv/config";
import {z} from "zod"; 


export const {
    DATABASE_URL,
    MINIO_URL,
    NODE_ENV,
    REDIS_URL,
    PORT,
    HOST
} = z.object({
    DATABASE_URL: z.string().url(),
    NODE_ENV:z.enum(["development", "production", "test"]),
    REDIS_URL:z.string().url(),
    MINIO_URL:z.string().url(),
    PORT:z.string().regex(/^\d+$/).transform(Number),
    HOST:z.string(),

}).parse(process.env);