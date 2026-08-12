import { auth_token } from "../../../../prisma/generated/prisma/client.js";
import { Repository } from "../repository.js";


export interface authTokenRepository extends Repository<auth_token>{
    findByUserId(user_id:string,page:number,size:number):Promise<auth_token[]>
}