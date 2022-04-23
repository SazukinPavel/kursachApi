import { User } from 'src/entitys/User.entity';
import { Course } from 'src/entitys/Course.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('authors')
export class Author{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @ManyToOne(()=>Course,course=>course.authors,{eager:true,cascade:true,onDelete:'CASCADE',onUpdate:'CASCADE'})
    course:Course

    @ManyToOne(()=>User,user=>user.ownCourses,{eager:true,cascade:true,onDelete:'CASCADE',onUpdate:'CASCADE'})
    user:User
}