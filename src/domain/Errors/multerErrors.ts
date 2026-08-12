export class MulterError extends Error{
    constructor(file_name:string,file_size:string,file_mimetype:string, reason?:string){
        super(`got a STORAGE ERROR while using multer ${file_name} of type ${file_mimetype} and size: ${file_size} during:${reason}`)
    }
}

export class MulterUploadError extends MulterError{
    constructor(file_name:string,file_size:string,file_mimetype:string){
        super(file_name,file_size,file_mimetype,"upload")
    }
}