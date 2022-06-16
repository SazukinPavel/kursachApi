import { IsNotEmpty} from "class-validator";

export class UpdateUserNameDto{

    @IsNotEmpty()
    name:string

}