import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Solution } from 'src/entitys/Solution.entity';
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
        await authorTasks.forEach(async (task)=>{
            const taskSolutions=await this.solutionsRepo.find({where:{task},relations:['owner']})
            solutions.push(...taskSolutions)
        })
        return solutions
    }

    async getUserSolutions(user:User){
        return this.solutionsRepo.find({where:{owner:user},relations:['task']})
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

    async deleteSolution(solutionId:string,user:User){
        const solution=await this.findSolutionByIdOrThrowExeption(solutionId)
        if(solution.owner.id!==user.id){
            throw new HttpException('Вы не владелец этого решения',HttpStatus.BAD_REQUEST)
        }
        return this.solutionsRepo.delete(solutionId)
    }

}
