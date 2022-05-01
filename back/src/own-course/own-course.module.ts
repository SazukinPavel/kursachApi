import { SubscriptionModule } from './../subscription/subscribtion.module';
import { UserModule } from 'src/user/user.module';
import { CourseModule } from './../course/course.module';
import { Author } from './../entitys/Author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OwnCourseController } from './own-course.controller';
import { OwnCourseService } from './own-course.service';
import { ResponseConstructorModule } from 'src/response-constructor/response-constructor.module';

@Module({
  imports:[TypeOrmModule.forFeature([Author]),CourseModule,UserModule,SubscriptionModule,ResponseConstructorModule],
  exports:[OwnCourseService],
  controllers: [OwnCourseController],
  providers: [OwnCourseService]
})

export class OwnCourseModule {}
