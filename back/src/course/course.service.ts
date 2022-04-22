import { OwnCourseService } from './../own-course/own-course.service';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entitys/Course.entity';
import { User } from 'src/entitys/User.entity';
import {Repository } from 'typeorm';
import { AddCourseDto } from './dto/AddCourse.dto';

@Injectable()
export class CourseService {

    constructor(@InjectRepository(Course) private courseRepo:Repository<Course>,
    private ownCourseService:OwnCourseService){}

    getAll(){
        return this.courseRepo.find({relations:['authors']})
    }

    async add({name}:AddCourseDto,user:User){
        const courseWithSameName=await this.findByName(name)
        if(courseWithSameName){
            throw new HttpException('Курс с таким именем уже существует',HttpStatus.BAD_REQUEST)
        }
        const course=this.courseRepo.create({name})
        const savedCourse= await this.courseRepo.save(course)
        await this.ownCourseService.addAuthorToCourse(user,savedCourse)
        return savedCourse
    }

    private findByName(name){
        return this.courseRepo.findOne({name})
    }

    async deleteById(id:string){
        await this.findCourseOrThrowExeption(id)
        return this.courseRepo.delete(id)
    }

    findById(id:string){
        return this.courseRepo.findOne(id)
    }

    async deleteByIdWithTeacherCheck(courseId:string,teacherId:string){
        const course=await this.findCourseOrThrowExeption(courseId)
        if(!course.authors.find((c)=>c.id===teacherId)){
            throw new HttpException('Вы не можете удалить чужой курс',HttpStatus.NOT_ACCEPTABLE)
        }
        return this.courseRepo.delete(courseId)
    }

    private async findCourseOrThrowExeption(id:string){
        const course=await this.courseRepo.findOne(id)
        if(!course){
            throw new HttpException('Курс не существует',HttpStatus.NOT_FOUND)
        }
        return course
    }

}
