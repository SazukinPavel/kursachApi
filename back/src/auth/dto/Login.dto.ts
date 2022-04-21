import { IsNotEmpty } from "class-validator";

export class LoginDto{

    @IsNotEmpty()
    emailOrName:string

    @IsNotEmpty()
    password:string

}