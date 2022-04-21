import { RoleType } from "src/types/RoleType";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course.entity";
import { Solution } from "./Solution.entity";

@Entity('users')
export class User{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    email:string

    @Column()
    password:string

    @Column()
    role:RoleType

    @ManyToMany(()=>Course,(course)=>course.authors)
    ownCourses:Course[]

    @ManyToMany(()=>Course,course=>course.subscribers)
    subscriptions:Course[]

    @ManyToMany(()=>Solution,course=>course.owner)
    solutions:Solution[]
}