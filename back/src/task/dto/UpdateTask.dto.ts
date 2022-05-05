import {IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateTaskDto{
    
    @IsUUID()
    @IsNotEmpty()
    taskId

    @IsNotEmpty()
    title:string

    @IsNotEmpty()
    description:string
}