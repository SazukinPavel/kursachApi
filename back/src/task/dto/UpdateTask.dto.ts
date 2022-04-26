import {IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateTaskDto{
    
    @IsUUID()
    taskId

    @IsNotEmpty()
    title:string

    @IsNotEmpty()
    description:string
}