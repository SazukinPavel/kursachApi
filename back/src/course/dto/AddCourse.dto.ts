import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { RoleType } from "src/types/RoleType";

export class AddCourseDto{

    @IsNotEmpty()
    name:string
}