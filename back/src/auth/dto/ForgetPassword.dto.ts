import { IsNotEmpty } from "class-validator";

export class ForgetPasswordDto{

    @IsNotEmpty()
    emailOrName:string

}