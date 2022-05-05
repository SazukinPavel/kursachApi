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

    async add({courseId,title,description}:AddTaskDto,user:User){
        const course=await this.courseService.findCourseOrThrowExeption(courseId)   
        const isAuthor=await this.ownCourseService.checkIsAuthor(user.id,course.id)        
        if(!isAuthor){
            throw new HttpException('Вы не владелец этого курса',HttpStatus.NOT_ACCEPTABLE)
        }
        return this.taskRepository.save({course,title,description})
    }

    async findTaskByIdOrTrowExeption(taskId:string){
        const task=await this.taskRepository.findOne(taskId)
        if(!task){
            throw new HttpException('Такой задачи не существует',HttpStatus.BAD_REQUEST)
        }
        return task
    }

    async deleteById(taskId:string){
        const task=await this.findTaskOrThrowExeption(taskId)
        return this.taskRepository.delete(task.id)
    }

    async deleteByIdWithUserCheck(taskId:string,user:User){
        const task=await this.findTaskOrThrowExeption(taskId)
        await this.ownCourseService.checkIsAuthor(user.id,task.course.id)
        return this.taskRepository.delete(task.id)
    }

    async updateTask({taskId,title,description}:UpdateTaskDto,author:User){
        const task=await this.findTaskOrThrowExeption(taskId)
        await this.ownCourseService.checkIsAuthor(author.id,task.course.id)
        return this.taskRepository.update(task.id,{title,description})
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
        const tasks:Task[]=[]
        await Promise.all(courses.map(async (course)=>{
            const courseTasks=await this.taskRepository.find({where:{course:course.id},relations:['course']})
            tasks.push(...courseTasks)
        }))
        return tasks
    }

    async getAuthorTask(author:User){
        const courses=await this.ownCourseService.getAuthorCourse(author)
        const tasks:Task[]=[]
        await Promise.all(courses.map(async (course)=>{
            const courseTasks=await this.taskRepository.find({where:{course:course.id},relations:['course']})
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
