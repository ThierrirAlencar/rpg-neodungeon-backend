import { user } from "../../../../prisma/generated/prisma/client.js";
import { userUpdateInput } from "../../../../prisma/generated/prisma/models.js";
import { Repository } from "../repository.js";

export interface userRepository extends Repository<user> {
    update(id: string, data: userUpdateInput): Promise<user>;
    findAll(filters:Partial<user>, page:number,size:number): Promise<user[]>;
    findByName(username:string):Promise<user | null>
    findByEmail(email:string):Promise<user | null>
}