import { AddAuthorDto } from './dto/AddAuthor.dto';
import { CourseService } from './../course/course.service';
import { User } from 'src/entitys/User.entity';
import { OwnCourseService } from './own-course.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Role } from 'src/decorators/Role.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { GetUser } from 'src/decorators/User.decorator';
import { AddCourseDto } from 'src/course/dto/AddCourse.dto';
import { ResponseConstructorService } from 'src/response-constructor/response-constructor.service';
import { UpdateCourseDto } from '../course/dto/UpdateCourse.dto';

@Controller('own-courses')
@UseGuards(RoleGuard)
export class OwnCourseController {
    
    constructor(private ownCourseService:OwnCourseService,
        private courseService:CourseService,
        private responseConstructorService:ResponseConstructorService){}

    @Get()
    @Role(['AUTHOR'])
    async getOwnCourses(@GetUser() user:User){
        return this.responseConstructorService.constructCoursesResponse(await this.ownCourseService.getAuthorCourse(user))
    }

    @Get(':courseId')
    @Role(['AUTHOR'])
    getSubscribers(@Param('courseId') courseId:string,@GetUser('id') auhtorId){
        return this.ownCourseService.getCourseSubscribers(auhtorId,courseId)
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
    async addAuthor(@Body() addAuthorDto:AddAuthorDto){
        return !!await this.ownCourseService.addAuthor(addAuthorDto)
    }

    @Delete(':id')
    @Role(['ADMIN','AUTHOR'])
    async deleteCourse(@Param('id') id:string,@GetUser() user:User){
        if(user.role==='ADMIN'){
            return this.courseService.deleteById(id)
        }else{
            return !!await this.ownCourseService.deleteCourseWithAuthorCheck(user.id,id)
        }
    }

    @Delete(':courseId/:authorId')
    @Role(['AUTHOR'])
    async deleteAuthorFromCourse(@Param('courseId') courseId:string,
    @Param('authorId') authorId:string,@GetUser() user:User){
        return !!await this.ownCourseService.deleteAuthorFromCourse(user,authorId,courseId)
    }

    @Put()
    @Role(['AUTHOR'])
    async updateCourse(@Body() updateCourseDto:UpdateCourseDto,@GetUser() user:User){
        return !!await this.ownCourseService.updateCourse(user,updateCourseDto)
    }
}
