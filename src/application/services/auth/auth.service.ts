import { Injectable } from "@nestjs/common";
import { prismaUserRepository } from "../../../domain/repository/user/prismaUserRepository.js";
import { RedisService } from "../redis/redis.service.js";
import {compare, hash} from "bcryptjs"
import { PASSWORD_SALT } from "../../../config/config.js";
import { AccountAlreadyExistsError, AccountDoesNotExistsError, WrongPasswordError } from "../../../domain/errors/authError.js";
import { safeUserMapper, unsafeUserMapper, userLoginMapper, userRegisterMapper } from "../../../domain/types/mappers.js";
import { authTokenRepository } from "../../../domain/repository/auth_token/auth_tokenRepository.js";
import { userRepository } from "../../../domain/repository/user/userRepository.js";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepositorie: prismaUserRepository,
        private readonly redisService: RedisService,
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
    async login(data:userLoginMapper):Promise<unsafeUserMapper>{
        const key = `login-${data.email}-${data.password}`
        const storedOnCache = await this.redisService.get(key)

        if(storedOnCache){
            return storedOnCache as unsafeUserMapper;
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
            const storeOnCache = await this.redisService.set(key,_parse_to_safety)

            return _parse_to_safety;

        }else{
            throw new WrongPasswordError();
        }
    }


}
