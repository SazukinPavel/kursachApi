import { SubscriptionService } from './../subscription/subscription.service';
import { UserService } from 'src/user/user.service';
import { AddAuthorDto } from './dto/AddAuthor.dto';
import { AddCourseDto } from './../course/dto/AddCourse.dto';
import { CourseService } from './../course/course.service';
import { Course } from 'src/entitys/Course.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/entitys/Author.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entitys/User.entity';
import { v4 } from 'uuid';

@Injectable()
export class OwnCourseService {

    constructor(@InjectRepository(Author)private authorRepo:Repository<Author>,
    private courseService:CourseService,
    private userService:UserService,
    private subscriptionService:SubscriptionService){}

    async getAuthorCourse(author:User){
        const authorInfo=await  this.authorRepo.find({where:{user:author},relations:['course']})
        return authorInfo.map((author)=>author.course)
    }

    private addAuthorToCourse(author:User,course:Course){
        const authorEntity=this.authorRepo.create({user:author,course,id:v4()})
        return this.authorRepo.save(authorEntity)
    }

    async addCourse(author:User,addCourseDto:AddCourseDto){
        const course=await this.courseService.add(addCourseDto)
        return this.addAuthorToCourse(author,course)
    }

    async deleteCourseWithAuthorCheck(authorId:string,courseId:string){
        await this.courseService.findCourseOrThrowExeption(courseId)
        await this.checkIsAuthor(authorId,courseId)
        return this.courseService.deleteById(courseId)
    }

    async checkIsAuthor(authorId:string,courseId:string){
        const authors=await this.authorRepo.find({where:{course:courseId},relations:['user']})
        if(!authors){
            throw new HttpException('Вы не владеете этим курсом',HttpStatus.NOT_ACCEPTABLE)
        }
        return !! authors.find((a)=>a.user.id===authorId)
    }

    async addAuthor({authorId,courseId}:AddAuthorDto){
        await this.checkIsAuthor(authorId,courseId)
        const course=await this.courseService.findCourseOrThrowExeption(courseId)
        const user=await this.userService.findById(authorId)
        if(user && user.role==='AUTHOR'){
            return this.authorRepo.save({user,course})
        }
        throw new HttpException('Такого автора не существует',HttpStatus.BAD_REQUEST)
    }

    async getCourseSubscribers(authorId:string,courseId:string){
        await this.checkIsAuthor(authorId,courseId)
        const course=await this.courseService.findCourseOrThrowExeption(courseId)
        return this.subscriptionService.getCourseSubscribers(course.id)
    }

}
