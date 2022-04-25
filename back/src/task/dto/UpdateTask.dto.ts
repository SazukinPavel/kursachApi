import {IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateTaskDto{
    
    @IsUUID()
    taskId

    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    description:string
}