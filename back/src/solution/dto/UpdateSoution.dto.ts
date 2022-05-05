import { IsNotEmpty, IsUUID } from "class-validator";

export class UpdateSolutionDto{
    @IsNotEmpty()
    text:string

    @IsNotEmpty()
    @IsUUID()
    solutionId:string
}