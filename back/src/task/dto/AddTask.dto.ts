import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddTaskDto{
    @IsUUID()
    courseId:string

    @IsNotEmpty()
    title:string

    @IsNotEmpty()
    description:string

}