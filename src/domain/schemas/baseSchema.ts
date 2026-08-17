import { ApiProperty, ApiResponse } from "@nestjs/swagger";
import { number } from "zod";


export class BaseSchema{

}

export class BaseSchemaResponse{
    @ApiProperty({name:"status",description:"Status Code Of the request",type:number })
    status:number = 0;
    @ApiProperty({name:"description",description:"A description of the status of the request",type:"string",nullable:true })
    description:string | undefined
    @ApiProperty({name:"body",description:"A response body containing an object of interest",type:"null",nullable:true })
    body:any | undefined
    @ApiProperty({name:"head",description:"A response head contaning metadata about the request",type:"null",nullable:true })
    head:any | undefined
}