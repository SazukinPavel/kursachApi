import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Role } from 'src/decorators/Role.decorator';
import { GetUser } from 'src/decorators/User.decorator';
import { User } from 'src/entitys/User.entity';
import { RoleGuard } from 'src/guards/role.guard';
import { ResponseConstructorService } from 'src/response-constructor/response-constructor.service';
import { AddReviewDto } from './dto/AddReview.dto';
import { UpdateReviewDto } from './dto/UpdateReview.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
@UseGuards(RoleGuard)
export class ReviewsController {

    constructor(private reviewService:ReviewsService,
        private responseConstructor:ResponseConstructorService){}

    @Get()
    @Role(['USER','AUTHOR'])
    async getReviews(@GetUser() user:User){
        if(user.role==='AUTHOR'){
            return this.responseConstructor.constructReviewsResponse(await this.reviewService.getAuthorsReviews(user))
        }
        return this.responseConstructor.constructReviewsResponse(await this.reviewService.getUserReviews(user))
    }

    @Get(':id')
    @Role(['USER','AUTHOR'])
    async getReviewById(@Param('reviewId') reviewId:string,@GetUser() user:User){
        return this.responseConstructor.constructReviewResponse(await this.reviewService.getReviewById(reviewId,user))
    }

    @Post()
    @Role(['AUTHOR'])
    @UsePipes(new ValidationPipe())
    async addReview(@Body() addReviewDto:AddReviewDto,@GetUser() user:User){
        return !!await this.reviewService.add(addReviewDto,user)
    }

    @Delete(':id')
    @Role(['AUTHOR','USER'])
    async deleteReview(@Param('id') reviewId:string,@GetUser() user:User){
        return !!await this.reviewService.deleteReviewById(reviewId,user)
    }

    @Put()
    @Role(['AUTHOR'])
    @UsePipes(new ValidationPipe())
    async updateReview(@Body() updateReviewDto:UpdateReviewDto,@GetUser() user:User){
        return !!await this.reviewService.updateReview(updateReviewDto,user)
    }
}
