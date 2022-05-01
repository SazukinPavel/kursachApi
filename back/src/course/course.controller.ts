import { Controller, Get, Param } from '@nestjs/common';
import { ResponseConstructorService } from 'src/response-constructor/response-constructor.service';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {

    constructor(private courseService:CourseService,
        private responseConstructorService:ResponseConstructorService){}

    @Get()
    async getCourses(){
        return this.responseConstructorService.constructCoursesResponse(
            await this.courseService.getAll()
        )
    }

    @Get(':id')
    async getCourseById(@Param('id')id:string){
        return this.responseConstructorService.constructCourseResponse(
            await this.courseService.findById(id)
        )
    }
    
}
