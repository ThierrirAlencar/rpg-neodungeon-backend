export type userRegisterMapper = {
    email:string,
    password:string,
    username:string | undefined
}

export type safeUserMapper = {
    email:string,
    password:string,
    username:string | null,
}

export type safeUserAuthResponse = {
    email:string,
    username:string | null,
    auth_token:string,
    auth_token_expires_in:Date,
    auth_token_registry_id:string
}

export type unsafeUserMapper = {
    email:string,
    password:string,
    username:string | null,
    id:string
}

export type userLoginMapper = {
    email:string,
    password:string
}