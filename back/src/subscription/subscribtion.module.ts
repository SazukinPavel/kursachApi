import { CourseModule } from './../course/course.module';
import { Subscription } from './../entitys/Subscription.entity';
import { SubscriptionService } from './subscription.service';
import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Subscription]),CourseModule],
  exports:[SubscriptionService],
  controllers: [SubscriptionController],
  providers: [SubscriptionService]
})
export class SubscriptionModule {}
