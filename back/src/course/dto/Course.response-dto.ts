import { User } from "src/entitys/User.entity"

export class CourseResponseDto{

    id:string
    name:string
    authors:User[]
}