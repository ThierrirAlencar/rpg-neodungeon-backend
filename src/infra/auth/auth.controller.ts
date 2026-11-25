import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth/auth.service.js';
import { AuthLoginResponseDto, AuthProfileResponseDto, AuthRegisterResponseDto, authLoginDTO, authRegisterBodyDTO } from '../../domain/schemas/authSchemas.js';
import { Response } from 'express';
import z from 'zod';
import { authError, InvalidAuthTokenError } from '../../domain/Errors/authError.js';
import { AuthRequest } from '../../domain/types/requests.js';
import { JwtAuthGuard } from '../../application/services/auth/jwt.guard.js';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {

    constructor(    
        private readonly authService: AuthService
    ){}

    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: AuthRegisterResponseDto })
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
    

    @ApiResponse({ status: 200, description: 'The user has logged-in sucessfully', type: AuthLoginResponseDto })
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
                body:_response
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

    @ApiBearerAuth('Authentication')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({status:200, description:"Successfully returned the user's profile", type:AuthProfileResponseDto})
    @ApiResponse({ status: 401, description: 'Unauthorized, try login again and insert a new token.'}) 
    @Get("/me")
    async profile(@Req() req:any, @Res() res:Response){
        const id = req.user.userId;

        try{
            const response = await this.authService.whoami(id)

            res.status(200).send({
                status:200,
                description:"Successfully returned my user profile!",
                body:response
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
