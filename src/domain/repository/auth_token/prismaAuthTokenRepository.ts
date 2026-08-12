import { Injectable } from "@nestjs/common";
import { authTokenRepository } from "./auth_tokenRepository.js";
import { PrismaService } from "../../../application/services/prisma/prisma-service.service.js";
import { status } from "../../../../prisma/generated/prisma/enums.js";
import { auth_tokenCreateInput, auth_tokenUncheckedUpdateInput, auth_tokenUpdateInput } from "../../../../prisma/generated/prisma/models.js";
import { auth_token } from "../../../../prisma/generated/prisma/client.js";

@Injectable()
export class PrismaAuthTokenRepository implements authTokenRepository{
    constructor(
        private readonly client: PrismaService
    ){
        
    }

    async create(data: auth_tokenCreateInput): Promise<{ id: string; token: string; expiresAt: Date; status: status; createdAt: Date; updatedAt: Date; deletedAt: Date | null; userId: string; }> {
        return await this.client.auth_token.create({
            data
        })
    }

    async delete(id: string): Promise<void> {
        await this.client.auth_token.delete({
            where:{
                id
            }
        })
    }

    async findAll(filters: Partial<auth_token>, page: number, size: number): Promise<{ id: string; token: string; expiresAt: Date; status: status; createdAt: Date; updatedAt: Date; deletedAt: Date | null; userId: string; }[]> {
        return await this.client.auth_token.findMany({
            where:filters,
            skip:(page-1)*size,
            take:page*size
        })
    }

    async findById(id: string): Promise<{ id: string; token: string; expiresAt: Date; status: status; createdAt: Date; updatedAt: Date; deletedAt: Date | null; userId: string; } | null> {
        return await this.client.auth_token.findUnique({
            where:{
                id
            }
        })
    }

    async findByUserId(user_id: string, page: number, size: number): Promise<auth_token[]> {
        return await this.client.auth_token.findMany({
            where:{
                userId:user_id
            },
            skip:(page-1)*size,
            take:page*size
        })
    }

    async update(id: string, data: auth_tokenUncheckedUpdateInput): Promise<{ id: string; token: string; expiresAt: Date; status: status; createdAt: Date; updatedAt: Date; deletedAt: Date | null; userId: string; }> {
        return await this.client.auth_token.update({
            where:{
                id
            },
            data
        })
    }
}