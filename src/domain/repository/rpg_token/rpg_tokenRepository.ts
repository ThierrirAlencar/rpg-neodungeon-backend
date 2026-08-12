import { rpg_token } from "../../../../prisma/generated/prisma/client.js";
import { Repository } from "../repository.js";

export interface rpgTokenRepository extends Repository<rpg_token> {
    findByUserId(user_id:string,page:number,size:number):Promise<rpg_token[]>
}