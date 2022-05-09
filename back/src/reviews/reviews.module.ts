import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/entitys/Review.entity';
import { SolutionModule } from 'src/solution/solution.module';
import { ResponseConstructorModule } from 'src/response-constructor/response-constructor.module';

@Module({
  imports:[TypeOrmModule.forFeature([Review]),SolutionModule,ResponseConstructorModule],
  providers: [ReviewsService],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
