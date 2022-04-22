import { User } from 'src/entitys/User.entity';
import { Course } from 'src/entitys/Course.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('subscribtions')
export class Subscription{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @ManyToOne(()=>Course,course=>course.subscribers)
    course:Course

    @ManyToOne(()=>User,user=>user.subscriptions)
    user:User
}