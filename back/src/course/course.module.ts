import { OwnCourseModule } from './../own-course/own-course.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entitys/Course.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  imports:[TypeOrmModule.forFeature([Course]),OwnCourseModule],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
