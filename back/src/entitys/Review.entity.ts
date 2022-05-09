import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Solution } from "./Solution.entity";
import { User } from "./User.entity";

@Entity('rewievs')
export class Review{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    text:string

    @CreateDateColumn()
    createdAt:Date

    @OneToOne(()=>Solution,solution=>solution.review,{eager:true,onDelete:'CASCADE'})
    @JoinColumn({name:'solutionId'})
    solution:Solution

    @ManyToOne(()=>User,user=>user.reviews)
    owner:User
}