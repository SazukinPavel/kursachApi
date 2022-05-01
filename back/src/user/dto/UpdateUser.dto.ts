import { IsNotEmpty, MinLength} from "class-validator";

export class UpdateUserDto{

    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    @MinLength(8)
    password:string
}