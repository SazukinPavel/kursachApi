import { IsUUID } from 'class-validator';
export class AddAuthorDto{
    @IsUUID()
    courseId:string

    @IsUUID()
    authorId:string
}