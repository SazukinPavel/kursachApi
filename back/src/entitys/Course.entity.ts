import { Author } from './Author.entity';
import { Subscription } from './Subscription.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task.entity";

@Entity('courses')
export class Course{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({unique:true})
    name:string

    @OneToMany(()=>Author,(author)=>author.course)
    authors:Author[]

    @OneToMany(()=>Task,(task)=>task.course)
    tasks:Task

    @OneToMany(()=>Subscription,subscription=>subscription.course)
    subscribers:Subscription[]
}