import { AddAuthorDto } from './dto/AddAuthor.dto';
import { CourseService } from './../course/course.service';
import { User } from 'src/entitys/User.entity';
import { OwnCourseService } from './own-course.service';
import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Role } from 'src/decorators/Role.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { GetUser } from 'src/decorators/User.decorator';
import { AddCourseDto } from 'src/course/dto/AddCourse.dto';

@Controller('own-courses')
@UseGuards(RoleGuard)
export class OwnCourseController {

    constructor(private ownCourseService:OwnCourseService,
        private courseService:CourseService){}

    @Get()
    @Role(['AUTHOR'])
    getOwnCourse(@GetUser() user:User){
        return this.ownCourseService.getAuthorCourse(user)
    }

    @Post()
    @Role(['AUTHOR'])
    @UsePipes(new ValidationPipe())
    addCourse(@Body() addCourseDto:AddCourseDto,@GetUser() user:User){
        return this.ownCourseService.addCourse(user,addCourseDto)
    }

    @Post('authors')
    @Role(['AUTHOR'])
    @UsePipes(new ValidationPipe())
    addAuthor(@Body() addAuthorDto:AddAuthorDto){
        return this.ownCourseService.addAuthor(addAuthorDto)
    }

    @Delete(':id')
    @Role(['ADMIN','AUTHOR'])
    deleteCourse(@Param('id') id:string,@GetUser() user:User){
        if(user.role==='ADMIN'){
            return this.courseService.deleteById(id)
        }else{
            return this.ownCourseService.deleteCourseWithAuthorCheck(user.id,id)
        }
    }

}
