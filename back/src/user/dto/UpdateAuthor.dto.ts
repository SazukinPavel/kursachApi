import { IsNotEmpty} from "class-validator";

export class UpdateAuthorDto{

    @IsNotEmpty()
    bio:string
}