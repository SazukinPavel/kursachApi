import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task.entity";
import { User } from "./User.entity";

@Entity('solutions')
export class Solution{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    text:string

    @ManyToOne(()=>Task,task=>task.solutions)
    task:Task

    @ManyToOne(()=>User,user=>user.solutions)
    owner:User
}