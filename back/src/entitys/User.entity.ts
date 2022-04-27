import { Author} from './Author.entity';
import { RoleType } from "src/types/RoleType";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Solution } from "./Solution.entity";
import { Subscription } from "./Subscription.entity";
import { Exclude } from 'class-transformer';
import { AuthorBio } from './AuthorBio.entity';

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

    @Exclude({ toPlainOnly: true })
    @Column()
    role:RoleType

    @OneToMany(()=>Author,(author)=>author.user)
    ownCourses:Author[]

    @OneToMany(()=>Solution,solution=>solution.owner)
    solutions:Solution[]

    @OneToOne(()=>AuthorBio,(authorBio)=>authorBio.bio)
    bio:AuthorBio
    
    @OneToMany(()=>Subscription,subscription=>subscription.user)
    subscriptions:Subscription[]
}