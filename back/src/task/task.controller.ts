import { UpdateTaskDto } from './dto/UpdateTask.dto';
import { User } from 'src/entitys/User.entity';
import { TaskService } from './task.service';
import { RoleGuard } from 'src/guards/role.guard';
import { Controller, Get, UseGuards, Param, Delete, Post, Put, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { Role } from 'src/decorators/Role.decorator';
import { AddTaskDto } from './dto/AddTask.dto';
import { GetUser } from 'src/decorators/User.decorator';

@Controller('tasks')
@UseGuards(RoleGuard)
export class TaskController {

    constructor(private taskService:TaskService){}

    @Get()
    @Role(['USER','AUTHOR'])
    getTasks(@GetUser() user:User){
        if(user.role==='AUTHOR'){
            return this.taskService.getAuthorTask(user)
        }
        return this.taskService.getUserTask(user)
    }    

    @Get(':courseId')
    @Role(['ALL'])
    getCourseTasks(@Param('courseId') courseId:string,@GetUser() user:User){
        return this.taskService.getTaskByCourse(courseId,user)
    }

    @Post()
    @Role(['AUTHOR'])
    @UsePipes(new ValidationPipe())
    addTask(@Body() addTaskDto:AddTaskDto,@GetUser() user){
        return this.taskService.add(addTaskDto,user)
    }

    @Put()
    @Role(['AUTHOR'])
    @UsePipes(new ValidationPipe())
    async updateTask(@Body() updateTaskDto:UpdateTaskDto,@GetUser() user:User){
        return !!await this.taskService.updateTask(updateTaskDto,user)
    }

    @Delete(':taskId')
    @Role(['ADMIN','AUTHOR'])
    async deleteTaskById(@Param('taskId') taskId:string,@GetUser() user:User){
        if(user.role==='ADMIN'){
            return !!await this.taskService.deleteById(taskId)
        }else{
            return !!await this.taskService.deleteByIdWithUserCheck(taskId,user)
        }
    }
}
