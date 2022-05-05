import { User } from "src/entitys/User.entity"
import { TaskResponse } from "./TaskResponse"

export class SolutionResponse{
    text:string
    id:string
    owner:User
    task:TaskResponse
}