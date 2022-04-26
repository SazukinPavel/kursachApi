import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entitys/Course.entity';
import {Repository } from 'typeorm';
import { AddCourseDto } from './dto/AddCourse.dto';
import { CourseResponseDto } from './dto/Course.response-dto';

@Injectable()
export class CourseService {

    constructor(@InjectRepository(Course) private courseRepo:Repository<Course>){}

    getAll(){
        return this.courseRepo.find({relations:['authors']})
    }

    async add({name,description}:AddCourseDto){
        const courseWithSameName=await this.findByName(name)
        if(courseWithSameName){
            throw new HttpException('Курс с таким именем уже существует',HttpStatus.BAD_REQUEST)
        }
        const course=this.courseRepo.create({name,description})
        return this.courseRepo.save(course)
    }

    private findByName(name){
        return this.courseRepo.findOne({name})
    }

    async deleteById(id:string){
        return this.courseRepo.delete(id)
    }

    findById(id:string){
        return this.findCourseOrThrowExeption(id)
    }

    async findCourseOrThrowExeption(id:string){
        const course=await this.courseRepo.findOne(id,{relations:['authors']})
        if(!course){
            throw new HttpException('Курс не существует',HttpStatus.NOT_FOUND)
        }
        return course
    }

    constructCoursesResponse(courses:Course[] ){
        return courses.map(({name,authors,id}):CourseResponseDto=>{
            const rightAuthors=authors.map((author)=>(author.user))
            return {name,id,authors:rightAuthors}
        })
    }

    constructCourseResponse({name,id,authors}:Course){
        const rightAuthors=authors?.map((author)=>(author.user))
        return {name,id,authors:rightAuthors}
    }

}
