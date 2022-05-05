import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Solution } from "./Solution.entity";

@Entity('rewievs')
export class Review{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    text:string

    @CreateDateColumn()
    createdAt:Date

    @ManyToOne(()=>Solution,solution=>solution.reviews)
    solution:Solution
}