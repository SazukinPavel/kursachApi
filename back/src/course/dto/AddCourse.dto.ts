import {IsNotEmpty } from "class-validator";

export class AddCourseDto{

    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    description:string
}