import { CourseService } from './../course/course.service';
import { AddSubscribtionDto } from './dto/AddSubscribtion.dto';
import { User } from 'src/entitys/User.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from 'src/entitys/Subscription.entity';

@Injectable()
export class SubscriptionService {

    constructor(@InjectRepository(Subscription) private subscriptionRepo:Repository<Subscription>,
    private courseService:CourseService){}

    getByUser(user:User){
        return this.subscriptionRepo.find({where:{user},relations:['course','user']}) 
    }

    async add({courseId}:AddSubscribtionDto,user:User){
        await this.throwIfSubscriptionExist(courseId,user)
        const course=await this.courseService.findCourseOrThrowExeption(courseId)
        return this.subscriptionRepo.save({course,user})
    }

    async delete(courseId:string,user:User){
        const subscription=await this.findSubscriptionOrThrowExeption(courseId,user)
        return this.subscriptionRepo.delete(subscription)
    }

    private async findSubscriptionOrThrowExeption(courseId:string,user:User){
        const subscription=await this.subscriptionRepo.findOne({where:{course:courseId,user}})
        if(!subscription){
            throw new HttpException('Такой подписки нет',HttpStatus.NOT_FOUND)
        }
        return subscription
    }

    private async throwIfSubscriptionExist(courseId:string,user:User){
        const subscription=await this.subscriptionRepo.findOne({where:{course:courseId,user}})
        if(subscription){
            throw new HttpException('Вы уже подписаны на этот курс',HttpStatus.BAD_REQUEST)
        }
    }

    getCourseSubscribers(courseId:string){
        return this.subscriptionRepo.find({where:{course:courseId},relations:['user']})
        .then((subscriptions)=>subscriptions.map((s)=>s.user))
    }
}
