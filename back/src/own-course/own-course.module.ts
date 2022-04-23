import { UserModule } from 'src/user/user.module';
import { CourseModule } from './../course/course.module';
import { Author } from './../entitys/Author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OwnCourseController } from './own-course.controller';
import { OwnCourseService } from './own-course.service';

@Module({
  imports:[TypeOrmModule.forFeature([Author]),CourseModule,UserModule],
  controllers: [OwnCourseController],
  providers: [OwnCourseService]
})

export class OwnCourseModule {}
