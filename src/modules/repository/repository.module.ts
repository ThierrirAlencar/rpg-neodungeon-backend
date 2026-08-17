import { Module } from "@nestjs/common";
import { prismaUserRepository } from "../../domain/repository/user/prismaUserRepository.js";
import { PrismaRpgTokenRepository } from "../../domain/repository/rpg_token/prismaRpgTokenRepository.js";
import { PrismaRpgTokenSocialImageRepository } from "../../domain/repository/rpg_token_social_image/PrismaRpgTokenSocialImageRepository.js";
import { PrismaRpgTokenSocialRepository } from "../../domain/repository/rpg_token_social/PrismaRpgTokenSocialRepository.js";
import { PrismaModule } from "../prisma/prisma.module.js";


@Module({
    imports: [PrismaModule],
    providers:[
        prismaUserRepository,
        PrismaRpgTokenRepository,
        PrismaRpgTokenSocialImageRepository,
        PrismaRpgTokenSocialRepository
    ],
    exports:[
        prismaUserRepository,
        PrismaRpgTokenRepository,
        PrismaRpgTokenSocialImageRepository,
        PrismaRpgTokenSocialRepository
    ]
})
export class RepositoryModule{}