import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Role } from 'src/decorators/Role.decorator';
import { GetUser } from 'src/decorators/User.decorator';
import { User } from 'src/entitys/User.entity';
import { RoleGuard } from 'src/guards/role.guard';
import { CourseService } from './course.service';
import { AddCourseDto } from './dto/AddCourse.dto';

@Controller('courses')
@UseGuards(RoleGuard)
export class CourseController {

    constructor(private courseService:CourseService){}

    @Get()
    @Role(['ALL'])
    getCourses(){
        return this.courseService.getAll()
    }

    @Get(':id')
    @Role(['ALL'])
    getCourseById(@Param('id')id:string){
        return this.courseService.findById(id)
    }

    @Post()
    @Role(['AUTHOR'])
    @UsePipes(new ValidationPipe())
    addCourse(@Body() addCourseDto:AddCourseDto,@GetUser() user:User){
        return this.courseService.add(addCourseDto,user)
    }

    @Delete(':id')
    @Role(['ADMIN','AUTHOR'])
    deleteCourse(@Param('id') id:string,@GetUser() user:User){
        if(user.role==='ADMIN'){
            return this.courseService.deleteById(id)
        }else{
            return this.courseService.deleteByIdWithTeacherCheck(id,user.id)
        }
    }
}
