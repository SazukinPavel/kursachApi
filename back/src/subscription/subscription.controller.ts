import { User } from 'src/entitys/User.entity';
import { SubscriptionService } from './subscription.service';
import { RoleGuard } from 'src/guards/role.guard';
import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Role } from 'src/decorators/Role.decorator';
import { GetUser } from 'src/decorators/User.decorator';
import { AddSubscribtionDto } from './dto/AddSubscribtion.dto';
import { ResponseConstructorService } from 'src/response-constructor/response-constructor.service';

@Controller('subscriptions')
@UseGuards(RoleGuard)
export class SubscriptionController {

    constructor(private subscriptionService:SubscriptionService,
        private responseConstructorService:ResponseConstructorService){}

    @Get()
    @Role(['USER'])
    async getSubscriptions(@GetUser() user){
        return this.responseConstructorService.constructCoursesResponse(
            await this.subscriptionService.getByUser(user)
        )
    }

    @Get(':courseId')
    @Role(['USER'])
    async findSubscribeByCourseId(@Param('courseId') courseId:string,@GetUser() user:User){
        return (await this.subscriptionService.findSubscriptionByCourseIdAndUser(courseId,user))!=null?true:false
    }

    @Post()
    @Role(['USER'])
    @UsePipes(new ValidationPipe())
    subscribeCourse(@Body() addSubscribtionDto:AddSubscribtionDto,@GetUser() user:User){
        return this.subscriptionService.add(addSubscribtionDto,user)
    }

    @Delete(':id')
    @Role(['USER'])
    async unsubscribeCourse(@Param('id') courseId:string,@GetUser() user:User):Promise<boolean>{
        return !!(await this.subscriptionService.delete(courseId,user))
    }

}
