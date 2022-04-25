import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {

    constructor(private courseService:CourseService){}

    @Get()
    async getCourses(){
        return this.courseService.constructCoursesResponse(await this.courseService.getAll())
    }

    @Get(':id')
    async getCourseById(@Param('id')id:string){
        return this.courseService.constructCourseResponse(await this.courseService.findById(id))
    }
    
}
