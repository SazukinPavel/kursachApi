import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Role } from 'src/decorators/Role.decorator';
import { GetUser } from 'src/decorators/User.decorator';
import { User } from 'src/entitys/User.entity';
import { RoleGuard } from 'src/guards/role.guard';
import { ResponseConstructorService } from 'src/response-constructor/response-constructor.service';
import { AddSolutionDto } from './dto/AddSolution.dto';
import {UpdateSolutionDto } from './dto/UpdateSoution.dto';
import { SolutionService } from './solution.service';

@Controller('solutions')
@UseGuards(RoleGuard)
export class SolutionController {

    constructor(private soltionService:SolutionService,
        private responseConstructorService:ResponseConstructorService){}

    @Get()
    @Role(['AUTHOR','USER'])
    async getAllSolutions(@GetUser() user:User){
        if(user.role==='AUTHOR'){
            return this.responseConstructorService
            .constructSolutionsResponse(await this.soltionService.getAuthorSolutions(user))
        }
        return this.responseConstructorService
            .constructSolutionsResponse(await this.soltionService.getUserSolutions(user))
    }

    @Post()
    @Role(['USER'])
    addSolution(@Body() addSolutionDto:AddSolutionDto,@GetUser() user:User){
        return this.soltionService.add(addSolutionDto,user)
    }

    @Delete(':solutionId')
    @Role(['USER'])
    async deleteSolution(@Param('solutionId') solutionId:string,@GetUser() user:User){
        return !!await this.soltionService.deleteSolution(solutionId,user)
    }

    @Put()
    @Role(['USER'])
    async updateSolution(@GetUser() user:User,@Body() updateSolutionDto:UpdateSolutionDto){
        return !!await this.soltionService.updateSolution(updateSolutionDto,user)
    }
}
