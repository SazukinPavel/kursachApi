import { UpdateTaskDto } from './dto/UpdateTask.dto';
import { SubscriptionService } from './../subscription/subscription.service';
import { User } from 'src/entitys/User.entity';
import { OwnCourseService } from './../own-course/own-course.service';
import { CourseService } from './../course/course.service';
import { AddTaskDto } from './dto/AddTask.dto';
import { Task } from './../entitys/Task.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {

    constructor(@InjectRepository(Task) private taskRepository:Repository<Task>,
    private courseService:CourseService,
    private ownCourseService:OwnCourseService,
    private subscriptionService:SubscriptionService){}

    async add({courseId,name,description}:AddTaskDto,user:User){
        const course=await this.courseService.findCourseOrThrowExeption(courseId)   
        const isAuthor=await this.ownCourseService.checkIsAuthor(user.id,course.id)        
        if(!isAuthor){
            throw new HttpException('Вы не владелец этого курса',HttpStatus.NOT_ACCEPTABLE)
        }
        return this.taskRepository.save({course,name,description})
    }

    async deleteById(id:string){
        const course=await this.courseService.findCourseOrThrowExeption(id)
        return this.taskRepository.delete(course)
    }

    async deleteByIdWithUserCheck(id:string,user:User){
        const course=await this.courseService.findCourseOrThrowExeption(id)
        await this.ownCourseService.checkIsAuthor(user.id,course.id)
        return this.taskRepository.delete(user)
    }

    async updateTask({taskId,name,description}:UpdateTaskDto,author:User){
        const task=await this.findTaskOrThrowExeption(taskId)
        await this.ownCourseService.checkIsAuthor(author.id,task.course.id)
        return this.taskRepository.update(task.id,{name,description})
    }

    private async findTaskOrThrowExeption(id:string){
        const task=await this.taskRepository.findOne({where:{id},relations:['course']})
        if(!task){
            throw new HttpException('Такого задания нету',HttpStatus.BAD_REQUEST)
        }
        return task
    }
    
    async getUserTask(user:User){
        const courses=await this.subscriptionService.getByUser(user)
        .then(subs=>subs.map(s=>s.course))
        const tasks:Task[]=[]
        await Promise.all(courses.map(async (course)=>{
            const courseTasks=await this.taskRepository.find({where:{course}})
            tasks.push(...courseTasks)
        }))
        return tasks
    }
    
    async getTaskByCourse(courseId:string,user:User){
        const course=await this.courseService.findCourseOrThrowExeption(courseId)
        if(user.role==='USER'){
            await this.subscriptionService.findSubscriptionOrThrowExeption(courseId,user)
        }else if(user.role==='AUTHOR'){
            await this.ownCourseService.checkIsAuthor(user.id,courseId)
        }
        return this.taskRepository.find({where:{course}})
    }
    
}
