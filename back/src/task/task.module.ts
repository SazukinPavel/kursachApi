import { SubscriptionModule } from './../subscription/subscribtion.module';
import { OwnCourseModule } from './../own-course/own-course.module';
import { CourseModule } from './../course/course.module';
import { Task } from './../entitys/Task.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports:[TypeOrmModule.forFeature([Task]),CourseModule,OwnCourseModule,SubscriptionModule],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
