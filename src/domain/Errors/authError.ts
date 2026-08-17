
export class authError extends Error{
    constructor(label?:string){
        super(label?label:'Authentication Error')
    }
}
export class AccountAlreadyExistsError extends authError{
    constructor(){
        super("Primary Key on use, try a new email or username")
    }
}

export class AccountDoesNotExistsError extends authError{
    constructor(){
        super("User does not exists, check the email and try again!")
    }
}

export class WrongPasswordError extends authError {
    constructor(){
        super("Wrong Password, try again!")
    }
} 