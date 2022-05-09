import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entitys/Review.entity';
import { User } from 'src/entitys/User.entity';
import { SolutionService } from 'src/solution/solution.service';
import { Repository } from 'typeorm';
import { AddReviewDto } from './dto/AddReview.dto';
import { UpdateReviewDto } from './dto/UpdateReview.dto';

@Injectable()
export class ReviewsService {

    constructor(@InjectRepository(Review) private reviewRepo:Repository<Review>,
    private solutionService:SolutionService){}

    async add({solutionId,text}:AddReviewDto,author:User){
        const solution=await this.solutionService.findSolutionByIdOrThrowExeption(solutionId)
        const review=this.reviewRepo.create({solution,text,owner:author})
        return this.reviewRepo.save(review)
    }

    async getUserReviews(user:User){
        const solutions=await this.solutionService.getUserSolutions(user)
        const reviews:Review[]=[]
        await Promise.all(solutions.map(async(solution)=>{
            const review=await this.reviewRepo.findOne({solution})
            if(review){
                reviews.push(review)
            }
        }))
        return reviews
    }

    async getAuthorsReviews(author:User){
        return this.reviewRepo.find({where:{owner:author},order:{createdAt:'DESC'}})
    }

    async getReviewById(reviewId:string,user:User){
        const review=await this.findReviewByIdOrThrowExeption(reviewId)
        if(user.role==='AUTHOR' ){
            if(review.owner.id!==user.id){
                throw new HttpException('У вас нет прав на этот ответ',HttpStatus.NOT_ACCEPTABLE)
            }
            return review
        }
        if(user.id!==review.solution.owner.id){
            throw new HttpException('У вас нет прав на этот ответ',HttpStatus.NOT_ACCEPTABLE)
        }
        return review
    }

    async deleteReviewById(reviewId:string,user:User){
        const review=await this.findReviewByIdOrThrowExeption(reviewId)
        if((user.role==='AUTHOR' && user.id===review.owner.id) || (user.role==='USER' && user.id===review.solution.owner.id)){
            return this.reviewRepo.delete(review.id)
        }
        throw new HttpException('У вас нет прав на этот ответ',HttpStatus.NOT_ACCEPTABLE)
    }  

    private async findReviewByIdOrThrowExeption(reviewId:string){
        const review=await this.reviewRepo.findOne({id:reviewId},{relations:['solution','owner']})
        if(!review){
            throw new HttpException('Такого ответа не существует',HttpStatus.BAD_REQUEST)
        }
        return review
    }

    async updateReview({reviewId,text}:UpdateReviewDto,user:User){
        const review=await this.findReviewByIdOrThrowExeption(reviewId)
        if(review.owner.id!==user.id){
            throw new HttpException('Вы не можете редактировать чужой ответ',HttpStatus.NOT_ACCEPTABLE)
        }
        return this.reviewRepo.update(review.id,{text})
    }
}
