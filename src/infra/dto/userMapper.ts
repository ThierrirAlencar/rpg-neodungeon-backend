import { ApiProperty } from "@nestjs/swagger";
import { safeUserMapper } from "../../domain/types/mappers.js";

export class SafeUserDto implements safeUserMapper {
    @ApiProperty()
    email: string = "";

    @ApiProperty()
    password: string = "";

    @ApiProperty({ nullable: true })
    username: string | null = null;
}