import { rpg_token } from "../../../../prisma/generated/prisma/client.js";
import { status } from "../../../../prisma/generated/prisma/enums.js";
import { rpg_tokenCreateInput, rpg_tokenUncheckedUpdateInput, rpg_tokenUpdateInput } from "../../../../prisma/generated/prisma/models.js";
import { PrismaService } from "../../../application/services/prisma/prisma-service.service.js";
import { rpgTokenRepository } from "./rpg_tokenRepository.js";

export class PrismaRpgTokenRepository implements rpgTokenRepository{
    constructor(
        private readonly client: PrismaService
    ){
    
    }


    async create(data: rpg_tokenCreateInput): Promise<{ id: string; token_json_url: string; token_json_changed_at: Date; token_json_slug: string; status: status; createdAt: Date; updatedAt: Date; deletedAt: Date | null; userId: string; }> {
        return await this.client.rpg_token.create({
            data
        })
    }

    async delete(id: string): Promise<void> {
        await this.client.rpg_token.delete({
            where:{
                id
            }
        })
    }

    async findAll(filters: Partial<rpg_token>, page: number, size: number): Promise<{ id: string; token_json_url: string; token_json_changed_at: Date; token_json_slug: string; status: status; createdAt: Date; updatedAt: Date; deletedAt: Date | null; userId: string; }[]> {
        return await this.client.rpg_token.findMany({
            where:filters,
            skip:(page-1)*size,
            take:page*size
        })
    }

    async findById(id: string): Promise<{ id: string; token_json_url: string; token_json_changed_at: Date; token_json_slug: string; status: status; createdAt: Date; updatedAt: Date; deletedAt: Date | null; userId: string; } | null> {
        return await this.client.rpg_token.findUnique({
            where:{
                id
            }
        })
    }

    async findByUserId(user_id: string, page:number,size:number): Promise<rpg_token[]> {
        return await this.client.rpg_token.findMany({
            where:{
                userId:user_id
            },
            skip:(page-1)*size,
            take:page*size
        })
    }

    async update(id: string, data: rpg_tokenUncheckedUpdateInput): Promise<{ id: string; token_json_url: string; token_json_changed_at: Date; token_json_slug: string; status: status; createdAt: Date; updatedAt: Date; deletedAt: Date | null; userId: string; }> {
        return await this.client.rpg_token.update({
            where:{
                id
            },
            data
        })
    }
    
}