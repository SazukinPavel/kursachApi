import { Author} from './Author.entity';
import { RoleType } from "src/types/RoleType";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Solution } from "./Solution.entity";
import { Subscription } from "./Subscription.entity";
import { classToPlain, Exclude } from 'class-transformer';
import { AuthorBio } from './AuthorBio.entity';
import { Review } from './Review.entity';

@Entity('users')
export class User{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    email:string

    @Column({default:false})
    @Exclude({ toPlainOnly: true})
    isEmailConfirmed:boolean

    @Column()
    @Exclude({ toPlainOnly: true})
    password:string
    

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

    @OneToMany(()=>Review,review=>review.owner)
    reviews:Review[]

    toJSON() {
        return classToPlain(this);
    }
    
}