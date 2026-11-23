import { Inject, Injectable } from "@nestjs/common";
import { prismaUserRepository } from "../../../domain/repository/user/prismaUserRepository.js";
import { RedisService } from "../redis/redis.service.js";
import {compare, hash} from "bcryptjs"
import { PASSWORD_SALT } from "../../../config/config.js";
import { safeUserAuthResponse, safeUserMapper, unsafeUserMapper, userLoginMapper, userRegisterMapper } from "../../../domain/types/mappers.js";
import { authTokenRepository } from "../../../domain/repository/auth_token/auth_tokenRepository.js";
import { PrismaAuthTokenRepository } from "../../../domain/repository/auth_token/prismaAuthTokenRepository.js";
import { userRepository } from "../../../domain/repository/user/userRepository.js";
import { AccountAlreadyExistsError, AccountDoesNotExistsError, WrongPasswordError } from "../../../domain/Errors/authError.js";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepositorie: prismaUserRepository,
        private readonly redisService: RedisService,
        @Inject(PrismaAuthTokenRepository)
        private readonly authTokenRepositorie: authTokenRepository,
        private readonly jwtService:JwtService
    ){}

    async register(data:userRegisterMapper):Promise<safeUserMapper>{
        const {email,password,username} = data
        const doesTheUserAlreadyExists = await this.userRepositorie.findByEmail(data.email);

        if(doesTheUserAlreadyExists){
            throw new AccountAlreadyExistsError()
        }

        const hashed_password = await hash(password,PASSWORD_SALT) ; 
        const _new_user = await this.userRepositorie.create({
            email,
            name:username,
            password:hashed_password,
        })

        return {
            email:_new_user.email,
            password:_new_user.password,
            username:_new_user.name
        }
    }

    //TODO - use auth token repositorie to build auth tokens
    async login(data:userLoginMapper):Promise<safeUserAuthResponse>{
        const key = `login-${data.email}-${data.password}`
        const storedOnCache = await this.redisService.get(key)

        if(storedOnCache){
            return storedOnCache as safeUserAuthResponse;
        }

        const _find = await this.userRepositorie.findByEmail(data.email);

        if(!_find){
            throw new AccountDoesNotExistsError()
        }
        const _compare = await compare(data.password,_find.password);
    
        if(_compare){
            let _parse_to_safety:unsafeUserMapper = {
                email:_find.email,
                password:_find.password,
                username:_find.name,
                id:_find.id
            }

            console.log("prejwtsign")
            //JWT generation logic
            const jwt_token = this.jwtService.sign({ sub: _parse_to_safety.id })

            console.log("prejwtdecode")
            // Read the exp claim (seconds since epoch) from the token we just signed
            const { exp } = this.jwtService.decode(jwt_token) as { exp: number };

            //Get the expires in date
            const jwt_token_expires_in = new Date(exp * 1000)

            console.log("preprismagenerationoftoken")
            //Stores the auth token on doctrine
            const stored_auth_token = await this.authTokenRepositorie.create({
                token: jwt_token,
                expiresAt: jwt_token_expires_in,
                userId:_parse_to_safety.id
            });

            const return_object = {
                auth_token:jwt_token,
                auth_token_expires_in: jwt_token_expires_in,
                auth_token_registry_id:stored_auth_token.id,
                email:_parse_to_safety.email,
                username:_parse_to_safety.username
            };

            await this.redisService.set(key,return_object)

            return return_object
        }else{
            throw new WrongPasswordError();
        }
    }

}
