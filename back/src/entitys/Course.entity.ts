import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task.entity";
import { User } from "./User.entity";

@Entity('courses')
export class Course{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({unique:true})
    name:string

    @ManyToMany(()=>User,(user)=>user.ownCourses)
    authors:User

    @OneToMany(()=>Task,(task)=>task.course)
    tasks:Task

    @ManyToMany(()=>User,user=>user.subscriptions)
    subscribers:User[]
}