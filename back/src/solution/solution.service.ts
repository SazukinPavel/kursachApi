import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Solution } from 'src/entitys/Solution.entity';
import { Task } from 'src/entitys/Task.entity';
import { User } from 'src/entitys/User.entity';
import { TaskService } from 'src/task/task.service';
import { Repository } from 'typeorm';
import { AddSolutionDto } from './dto/AddSolution.dto';
import { UpdateSolutionDto } from './dto/UpdateSoution.dto';

@Injectable()
export class SolutionService {

    constructor(@InjectRepository(Solution) private solutionsRepo:Repository<Solution>,
    private taskService:TaskService){}

    async add({taskId,text}:AddSolutionDto,owner:User){
        const task=await this.taskService.findTaskByIdOrTrowExeption(taskId)
        return this.solutionsRepo.save({text,task,owner})
    }

    async getAuthorSolutions(author:User){
        const solutions:Solution[]=[]
        const authorTasks=await this.taskService.getAuthorTask(author)
        await Promise.all(authorTasks.map(async (task)=>{
            const taskSolutions=await this.solutionsRepo.find({where:{task},relations:['owner','task','review'],order:{createdAt:"DESC"}})
            solutions.push(...taskSolutions)
        }))
        return solutions.sort((a,b)=>+b.createdAt-+a.createdAt)
    }

    async findSolutionsByUserAndTask(user:User,task:Task){
        return this.solutionsRepo.find({where:{owner:user,task}})
    }

    async getUserSolutions(user:User){
        return (await this.solutionsRepo.find({where:{owner:user},relations:['task']})).sort((a,b)=>{
            return +b.createdAt-+a.createdAt;
        })
    }

    async findSolutionByIdOrThrowExeption(solutionId:string){
        const solution=await this.solutionsRepo.findOne(solutionId)
        if(!solution){
            throw new HttpException('Такого решения не существует',HttpStatus.BAD_REQUEST)
        }
        return solution
    }

    async updateSolution({text,solutionId}:UpdateSolutionDto,user:User){
        const solution=await this.findSolutionByIdOrThrowExeption(solutionId)
        if(solution.owner.id!==user.id){
            throw new HttpException('Вы не владелец этого решения',HttpStatus.BAD_REQUEST)
        }
        return this.solutionsRepo.update(solution.id,{text})
    }

    async getSolutionByTaskAndUser(taskId:string,user:User){
        return this.solutionsRepo.findOne({where:{task:taskId,owner:user}})
    }

    async deleteSolution(solutionId:string,user:User){
        const solution=await this.findSolutionByIdOrThrowExeption(solutionId)
        if(solution.owner.id!==user.id){
            throw new HttpException('Вы не владелец этого решения',HttpStatus.BAD_REQUEST)
        }
        return this.solutionsRepo.delete(solutionId)
    }

}
