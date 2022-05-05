import { IsNotEmpty, IsUUID } from "class-validator";

export class AddSolutionDto{
    @IsNotEmpty()
    text:string

    @IsNotEmpty()
    @IsUUID()
    taskId:string
}