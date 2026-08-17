import { Injectable } from "@nestjs/common";
import { userRepository } from "./userRepository.js";
import { status } from "../../../../prisma/generated/prisma/enums.js";
import { PrismaService } from "../../../application/services/prisma/prisma-service.service.js";
import { userCreateInput, userUpdateInput } from "../../../../prisma/generated/prisma/models.js";
import { user } from "../../../../prisma/generated/prisma/client.js";

@Injectable()
export class prismaUserRepository implements userRepository{
    constructor(
        private readonly client: PrismaService
    ){

    }
    
    async create(data: userCreateInput): Promise<{password:string; name: string | null; id: string; email: string; status: status; createdAt: Date; updatedAt: Date; deletedAt: Date | null; }> {
        return await this.client.user.create({
            data
        })
    }

    async delete(id: string): Promise<void> {
        await this.client.user.delete({
            where:{
                id
            }
        })
    }

    async update(id: string, data: userUpdateInput): Promise<user> {
        return await this.client.user.update({
            where:{
                id
            },
            data
        })
    }

    async findAll(filters: Partial<user>, page: number, size: number): Promise<user[]> {
        return await this.client.user.findMany({
            where:filters,
            skip:(page-1)*size,
            take:page*size
        })
    }

    async findByEmail(email: string): Promise<user | null> {
        return await this.client.user.findUnique({
            where:{
                email
            }
        })
    }

    async findById(id: string): Promise<{password:string; name: string | null; id: string; email: string; status: status; createdAt: Date; updatedAt: Date; deletedAt: Date | null; } | null> {
        return await this.client.user.findUnique({
            where:{
                id
            }
        })
    }

    async findByName(username: string): Promise<user | null> {
        return await this.client.user.findFirst({
            where:{
                name:username
            }
        })
    }
}