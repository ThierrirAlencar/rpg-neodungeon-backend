import "dotenv/config";
import {z} from "zod"; 
const env = process.env;

export const {
    DATABASE_URL,
    MINIO_URL,
    NODE_ENV,
    REDIS_URL
} = z.object({
    
    DATABASE_URL: z.string().url(),
    NODE_ENV:z.enum(["development", "production", "test"]),
    REDIS_URL:z.string().url(),
    MINIO_URL:z.string().url()

}).parse({env});