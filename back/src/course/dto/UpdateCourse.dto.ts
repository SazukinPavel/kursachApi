import { IsNotEmpty, IsUUID } from "class-validator";


export class UpdateCourseDto{

    @IsNotEmpty()
    @IsUUID()
    id:string

    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    description:string
}