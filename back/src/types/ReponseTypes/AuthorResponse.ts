import { CourseInfo } from "../CourseInfo"

export class AuthorResponse{

    id:string
    name:string
    bio:string
    courses?:CourseInfo[]
}