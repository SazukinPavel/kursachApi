import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { RoleType } from "src/types/RoleType";

export class AddUserDto{

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @Length(8)
    password:string

    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    role:RoleType

}