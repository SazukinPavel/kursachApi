import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./Review.entity";
import { Task } from "./Task.entity";
import { User } from "./User.entity";

@Entity('solutions')
export class Solution{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    text:string

    @ManyToOne(()=>Task,task=>task.solutions,{onDelete:'CASCADE',eager:true})
    task:Task

    @ManyToOne(()=>User,user=>user.solutions,{onDelete:'CASCADE',eager:true})
    owner:User

    @OneToOne(()=>Review,review=>review.solution)
    review:Review

    @CreateDateColumn()
    createdAt:Date

}