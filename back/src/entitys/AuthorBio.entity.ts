import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';

@Entity('authorsBio')
export class AuthorBio{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({default:''})
    bio:string

    @OneToOne(()=>User,user=>user.bio)
    @JoinColumn()
    user:User
}