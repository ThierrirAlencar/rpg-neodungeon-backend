import z, { object } from "zod";
import { BaseSchema, BaseSchemaResponse } from "./baseSchema.js";
import { SafeUserDto } from "../../infra/dto/userMapper.js";
import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { safeUserMapper } from "../types/mappers.js";


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

export abstract class authRegisterResponseDTO extends BaseSchemaResponse {
    @ApiProperty({name:"body",description:"A response body containing the safe user object of interest",type:"string"})
    body: safeUserMapper = {
        email:"",password:"",username:""
    };
}