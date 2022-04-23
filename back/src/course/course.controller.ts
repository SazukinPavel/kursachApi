import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {

    constructor(private courseService:CourseService){}

    @Get()
    getCourses(){
        return this.courseService.getAll()
    }

    @Get(':id')
    getCourseById(@Param('id')id:string){
        return this.courseService.findById(id)
    }
    
}
