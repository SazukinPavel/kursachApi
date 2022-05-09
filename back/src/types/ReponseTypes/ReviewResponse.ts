import { User } from "src/entitys/User.entity"
import { SolutionResponse } from "./SolutionResponse"

export class ReviewResponse{

    id:string
    text:string
    solution:SolutionResponse
    owner:User
}