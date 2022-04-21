import { IsEmail, IsNotEmpty, IsUUID, Length } from "class-validator";
import { RoleType } from "src/types/RoleType";

export class UpdateUserDto{

    @IsNotEmpty()
    @IsUUID()
    id:string

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