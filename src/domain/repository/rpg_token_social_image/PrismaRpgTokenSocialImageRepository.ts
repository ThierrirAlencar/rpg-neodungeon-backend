import { filter } from "rxjs";
import { rpg_token_social_image } from "../../../../prisma/generated/prisma/client.js";
import { status } from "../../../../prisma/generated/prisma/enums.js";
import { rpg_token_social_imageUncheckedCreateInput, rpg_token_social_imageUncheckedUpdateInput } from "../../../../prisma/generated/prisma/models.js";
import { PrismaService } from "../../../application/services/prisma/prisma-service.service.js";

import { rpgTokenSocialImageRepository } from "./rpg_token_social_imageRepository.js";

export class PrismaRpgTokenSocialImageRepository implements  rpgTokenSocialImageRepository{
    constructor(
        private readonly client: PrismaService
    ){}
    
    async create(data: rpg_token_social_imageUncheckedCreateInput): Promise<rpg_token_social_image> {
        return await this.client.rpg_token_social_image.create({
            data
        })
    }
    
    async delete(id: string): Promise<void> {
        await this.client.rpg_token_social_image.delete({
            where:{
                id
            }
        })
    }

    async findAll(filters: rpg_token_social_image, page: number, size: number): Promise<{ id: string; image: string; status: status; createdAt: Date; updatedAt: Date; deletedAt: Date | null; token_social_id: string; }[]> {
        return await this.client.rpg_token_social_image.findMany({
            where:filters,
            take:size*page,
            skip:(size-1)*page
        })    
    }

    async findById(id: string): Promise<{ id: string; image: string; status: status; createdAt: Date; updatedAt: Date; deletedAt: Date | null; token_social_id: string; } | null> {
        return await this.client.rpg_token_social_image.findUnique({
            where:{
                id
            }
        })
    }
    async findByTokenId(social_id: string, page: number, size: number): Promise<rpg_token_social_image[]> {
        return await this.client.rpg_token_social_image.findMany({
            where:{
                token_social_id:social_id
            },
            take:size*page,
            skip:(size-1)*page
        })    
    }

    async update(id: string, data: rpg_token_social_imageUncheckedUpdateInput): Promise<rpg_token_social_image> {
        return await this.client.rpg_token_social_image.update({
            where:{
                id
            },
            data
        })
    }
}