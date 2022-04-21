import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Role } from 'decorators/Role.decorator';
import { GetUser } from 'decorators/User.decorator';
import { User } from 'src/entitys/User.entity';
import { RoleGuard } from 'src/guards/role.guard';
import { CourseService } from './course.service';
import { AddCourseDto } from './dto/AddCourse.dto';

@Controller('courses')
@UseGuards(RoleGuard)
export class CourseController {

    constructor(private courseService:CourseService){}

    @Get()
    @Role('USER')
    getCourses(){
        return this.courseService.getAll()
    }

    @Get('user')
    @Role('USER')
    getUserCourse(@GetUser() user:User){
        return this.courseService.findByUser(user)
    }

    @Get('my')
    @Role('TEACHER')
    getTeacherCourses(@GetUser() user:User){
        return this.courseService.getTeacherCourses(user)
    }

    @Post()
    @Role('TEACHER')
    addCourse(@Body() addCourseDto:AddCourseDto,@GetUser() user:User){
        return this.courseService.add(addCourseDto,user)
    }
}
