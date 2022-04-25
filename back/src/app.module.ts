import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module} from '@nestjs/common';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { SubscriptionModule } from './subscription/subscribtion.module';
import { OwnCourseModule } from './own-course/own-course.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule, 
    AuthModule, 
    CourseModule,
    SubscriptionModule,
    OwnCourseModule,
    TaskModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes("*");
  }
}
