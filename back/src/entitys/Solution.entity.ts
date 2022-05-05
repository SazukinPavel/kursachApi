import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./Review.entity";
import { Task } from "./Task.entity";
import { User } from "./User.entity";

@Entity('solutions')
export class Solution{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    text:string

    @ManyToOne(()=>Task,task=>task.solutions,{onDelete:'CASCADE'})
    task:Task

    @ManyToOne(()=>User,user=>user.solutions,{onDelete:'CASCADE'})
    owner:User

    @OneToMany(()=>Review,review=>review.solution)
    reviews:Review[]

    @CreateDateColumn()
    createdAt:Date

}