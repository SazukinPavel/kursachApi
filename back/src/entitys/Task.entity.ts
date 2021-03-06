import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course.entity";
import { Solution } from "./Solution.entity";

@Entity('tasks')
export class Task{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    title:string

    @Column()
    description:string

    @ManyToOne(()=>Course,(course)=>course.tasks,{eager:true,onDelete:'CASCADE'})
    course:Course

    @OneToMany(()=>Solution,solution=>solution.task)
    solutions:Solution[]

    @CreateDateColumn()
    createdAt:Date

}