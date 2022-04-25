import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddTaskDto{
    @IsUUID()
    courseId:string

    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    description:string

}