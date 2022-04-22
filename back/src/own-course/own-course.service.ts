import { Course } from 'src/entitys/Course.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/entitys/Author.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entitys/User.entity';

@Injectable()
export class OwnCourseService {

    constructor(@InjectRepository(Author)private authorRepo:Repository<Author>){}

    getAuthorCourse(author:User){
        return this.authorRepo.find({where:{user:author},relations:['course']})
    }

    addAuthorToCourse(author:User,course:Course){
        return this.authorRepo.save({user:author,course})
    }

}
