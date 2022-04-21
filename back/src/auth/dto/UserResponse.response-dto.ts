import { User } from "src/entitys/User.entity";

export interface UserResponse{
    user:User
    token:string
}