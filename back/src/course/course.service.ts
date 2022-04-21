import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entitys/Course.entity';
import { User } from 'src/entitys/User.entity';
import { Repository } from 'typeorm';
import { AddCourseDto } from './dto/AddCourse.dto';

@Injectable()
export class CourseService {

    constructor(@InjectRepository(Course) private courseRepo:Repository<Course>){}

    getAll(){
        return this.courseRepo.find()
    }

    findByUser(user:User){
        return this.courseRepo.find({where:{subscribers:user}})
    }

    add(addCourseDto:AddCourseDto,user:User){
        return this.courseRepo.save({...addCourseDto,author:user})
    }

    deleteById(id:string){
        return this.courseRepo.delete(id)
    }

    findById(id:string){
        return this.courseRepo.findOne(id)
    }

    getTeacherCourses(user:User){
        return this.courseRepo.find({where:{authors:user}})
    }
}
