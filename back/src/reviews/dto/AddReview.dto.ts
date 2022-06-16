import { IsBoolean, IsNotEmpty, IsUUID } from "class-validator";

export class AddReviewDto{
    @IsNotEmpty()
    text:string

    @IsBoolean()
    isRight:boolean

    @IsNotEmpty()
    @IsUUID()
    solutionId:string
}