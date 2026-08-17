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