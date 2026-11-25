import { ApiProperty } from "@nestjs/swagger";
import { safeUserAuthResponse, safeUserMapper, safeUserProfileMapper,  } from "../../domain/types/mappers.js";
import { Extends } from "../../../prisma/generated/prisma/internal/prismaNamespace.js";
import { status } from "../../../prisma/generated/prisma/enums.js";

export class SafeUserDto implements safeUserMapper {
    @ApiProperty()
    email: string = "";

    @ApiProperty()
    password: string = "";

    @ApiProperty({ nullable: true })
    username: string | null = null;
}

export class SafeUserLoginResponse implements safeUserAuthResponse {
    @ApiProperty()
    auth_token: string = "";
    @ApiProperty()
    auth_token_expires_in: Date = new Date();
    @ApiProperty()
    auth_token_registry_id: string = "";
    @ApiProperty()
    email: string = "";
    @ApiProperty()
    username: string | null = null;
}

export class SafeUserProfileResponse implements safeUserProfileMapper {
    @ApiProperty()
    created_at: Date = new Date();
    @ApiProperty()
    deleted_at?: Date | null | undefined; 
    @ApiProperty()
    status: status = status.ACTIVE;
    @ApiProperty()
    updated_at?: Date | null | undefined;
    @ApiProperty()
    email: string = "";
    @ApiProperty()
    username: string | null = null;
}