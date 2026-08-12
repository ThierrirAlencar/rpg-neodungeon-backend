import { rpg_token_social } from "../../../../prisma/generated/prisma/client.js";
import { status } from "../../../../prisma/generated/prisma/enums.js";
import { rpg_token_socialCreateInput, rpg_token_socialUncheckedCreateInput } from "../../../../prisma/generated/prisma/models.js";
import { PrismaService } from "../../../application/services/prisma/prisma-service.service.js";
import { rpgTokenSocialRepository } from "./rpg_token_socialRepository.js";

export class PrismaRpgTokenSocialRepository implements rpgTokenSocialRepository{
    constructor(
        private readonly client: PrismaService
    ){}
    
    async create(data: rpg_token_socialCreateInput): Promise<{ id: string; public: boolean; public_name: string | null; public_description: string | null; status: status; createdAt: Date; updatedAt: Date; deletedAt: Date | null; token_id: string; }> {
        return await this.client.rpg_token_social.create({
            data
        })
    }

    async delete(id: string): Promise<void> {
        await this.client.rpg_token_social.delete({
            where:{
                id
            }
        })
    }

    async findAll(filters: Partial<rpg_token_social>, page: number, size: number): Promise<{ id: string; public: boolean; public_name: string | null; public_description: string | null; status: status; createdAt: Date; updatedAt: Date; deletedAt: Date | null; token_id: string; }[]> {
        return await this.client.rpg_token_social.findMany({
            where:filters,
            take:page*size,
            skip:(page-1)*size
        })
    }
    
    async findById(id: string): Promise<{ id: string; public: boolean; public_name: string | null; public_description: string | null; status: status; createdAt: Date; updatedAt: Date; deletedAt: Date | null; token_id: string; } | null> {
        return await this.client.rpg_token_social.findUnique({
            where:{
                id
            }
        })
    }

    async update(id: string, data: rpg_token_socialUncheckedCreateInput): Promise<{ id: string; public: boolean; public_name: string | null; public_description: string | null; status: status; createdAt: Date; updatedAt: Date; deletedAt: Date | null; token_id: string; }> {
        return await this.client.rpg_token_social.update({
            where:{
                id
            },
            data
        })
    }
}