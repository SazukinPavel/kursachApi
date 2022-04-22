import { IsUUID } from "class-validator";

export class AddSubscribtionDto{

    @IsUUID()
    courseId:string

}