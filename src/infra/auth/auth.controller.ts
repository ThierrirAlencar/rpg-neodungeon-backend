import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth/auth.service.js';
import { authLoginDTO, authRegisterBodyDTO, authRegisterResponseDTO} from '../../domain/schemas/authSchemas.js';
import { Response } from 'express';
import { AccountAlreadyExistsError, authError } from '../../domain/errors/authError.js';
import z from 'zod';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {

    constructor(    
        private readonly authService: AuthService
    ){}

    @ApiResponse({ status: 201, description: 'The user has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'}) 
    @Post("/register")
    async register(
        @Body() body:authRegisterBodyDTO,
        @Res() res:Response
    ) {
        const {email,password,username} = z.object({
            email:z.string().email(),
            password:z.string(),
            username:z.string()
        }).parse(body);        

        try{    
            const registry = await this.authService.register({
                email,password,username
            })

            res.status(201).send({
                status:201,
                description:"Registered user successfully!",
                body:registry
            })
        }catch(err){
            if(err instanceof authError){
                res.status(403).send({
                    status:403,
                    description:err.message,
                    error:err
                })
            }else{
                res.status(500).send({
                    status:500,
                    description:"Unknow error! Please report.",
                    error:err
                })
            }
        }
    }
    

    @ApiResponse({ status: 200, description: 'The user has logged-in sucessfully'})
    @ApiResponse({ status: 403, description: 'Forbidden.'}) 
    @Post("/login")
    async login(@Body() body:authLoginDTO, @Res() res:Response){
        const {email, password} = z.object({
            email:z.string().email(),
            password:z.string()
        }).parse(body)

        try{
            const _response = await this.authService.login({email,password});

            res.status(200).send({
                status:200,
                description:"Logged-in Successfully!",
                _response:_response //should throw a token latter on
            })
        }catch(err){
            if(err instanceof authError){
                res.status(403).send({
                    status:403,
                    description:err.message,
                    error:err
                })
            }else{
                res.status(500).send({
                    status:500,
                    description:"Unknow error! Please report.",
                    error:err
                })
            }
        }
    }
}
