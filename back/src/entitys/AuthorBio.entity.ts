import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';

@Entity('authors')
export class AuthorBio{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({default:''})
    bio:string

    @OneToOne(()=>User,user=>user.bio)
    user:User
}