import { CourseInfo } from "../CourseInfo"

export interface TaskResponse{
    id:string 
    title:string
    description:string
    course:CourseInfo
}