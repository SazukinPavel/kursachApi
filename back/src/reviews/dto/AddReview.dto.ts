import { IsNotEmpty, IsUUID } from "class-validator";

export class AddReviewDto{
    @IsNotEmpty()
    text:string

    @IsNotEmpty()
    @IsUUID()
    solutionId:string
}