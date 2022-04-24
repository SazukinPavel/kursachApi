import { User } from 'src/entitys/User.entity';
import { SubscriptionService } from './subscription.service';
import { RoleGuard } from 'src/guards/role.guard';
import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Role } from 'src/decorators/Role.decorator';
import { GetUser } from 'src/decorators/User.decorator';
import { AddSubscribtionDto } from './dto/AddSubscribtion.dto';

@Controller('subscriptions')
@UseGuards(RoleGuard)
export class SubscriptionController {

    constructor(private subscriptionService:SubscriptionService){}

    @Get()
    @Role(['USER'])
    getSubscriptions(@GetUser() user){
        return this.subscriptionService.getByUser(user)
    }

    @Post()
    @Role(['USER'])
    @UsePipes(new ValidationPipe())
    subscribeCourse(@Body() addSubscribtionDto:AddSubscribtionDto,@GetUser() user:User){
        return this.subscriptionService.add(addSubscribtionDto,user)
    }

    @Delete(':id')
    @Role(['USER'])
    unsubscribeCourse(@Param('id') courseId:string,@GetUser() user:User){
        return this.subscriptionService.delete(courseId,user)
    }

}
