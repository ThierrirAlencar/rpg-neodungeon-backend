import { BaseSchema, BaseSchemaResponse } from "./baseSchema.js";
import { SafeUserDto, SafeUserLoginResponse, SafeUserProfileResponse } from "../../infra/dto/userMapper.js";
import { ApiProperty } from "@nestjs/swagger";


export abstract class authRegisterBodyDTO extends BaseSchema{
    @ApiProperty({name:"email", description:"User email adress", type:"string"})
    email:string = ""
    @ApiProperty({name:"username", description:"User username", type:"string"})
    username:string = ""
    @ApiProperty({name:"password", description:"User password adress", type:"string"})
    password:string = ""
}

export abstract class authLoginDTO extends BaseSchema{
    @ApiProperty({name:"email", description:"User email adress", type:"string"})
    email:string = ""
    @ApiProperty({name:"password", description:"User password adress", type:"string"})
    password:string = ""
}

export class AuthRegisterResponseDto extends BaseSchemaResponse {
    @ApiProperty({ description: "The registered user", type: SafeUserDto })
    declare body: SafeUserDto;
}

export class AuthLoginResponseDto extends BaseSchemaResponse {
    @ApiProperty({ description: "The authenticated user and token", type: SafeUserLoginResponse })
    declare body: SafeUserLoginResponse;
}

export class AuthProfileResponseDto extends BaseSchemaResponse {
    @ApiProperty({ description: "The profile of the authenticated user", type: SafeUserLoginResponse })
    declare body: SafeUserProfileResponse;
}

