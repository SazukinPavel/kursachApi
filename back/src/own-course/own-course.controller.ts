import { User } from 'src/entitys/User.entity';
import { OwnCourseService } from './own-course.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Role } from 'src/decorators/Role.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { GetUser } from 'src/decorators/User.decorator';

@Controller('own-courses')
@UseGuards(RoleGuard)
export class OwnCourseController {

    constructor(private ownCourseService:OwnCourseService){}

    @Get()
    @Role(['AUTHOR'])
    getOwnCourse(@GetUser() user:User){
        return this.ownCourseService.getAuthorCourse(user)
    }

}
