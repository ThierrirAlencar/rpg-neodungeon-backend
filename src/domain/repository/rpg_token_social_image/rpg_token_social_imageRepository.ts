import { rpg_token_social, rpg_token_social_image } from "../../../../prisma/generated/prisma/client.js";
import { Repository } from "../repository.js";

export interface rpgTokenSocialImageRepository extends Repository<rpg_token_social_image>{
        findByTokenId(social_id:string,page:number,size:number):Promise<rpg_token_social_image[]>
}