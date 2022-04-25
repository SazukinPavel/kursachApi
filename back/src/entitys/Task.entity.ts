import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course.entity";
import { Solution } from "./Solution.entity";

@Entity('tasks')
export class Task{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    description:string

    @ManyToOne(()=>Course,(course)=>course.tasks,{onDelete:'CASCADE'})
    course:Course

    @OneToMany(()=>Solution,solution=>solution.task)
    solutions:Solution[]
}