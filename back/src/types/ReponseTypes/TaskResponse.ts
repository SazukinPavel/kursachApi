import { CourseInfo } from "../CourseInfo"

export class TaskResponse{
    id:string 
    title:string
    description:string
    course:CourseInfo
    createdAt:Date
}