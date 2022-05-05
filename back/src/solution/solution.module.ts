import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solution } from 'src/entitys/Solution.entity';
import { ResponseConstructorModule } from 'src/response-constructor/response-constructor.module';
import { TaskModule } from 'src/task/task.module';
import { SolutionController } from './solution.controller';
import { SolutionService } from './solution.service';

@Module({
  imports:[TypeOrmModule.forFeature([Solution]),ResponseConstructorModule,TaskModule],
  controllers: [SolutionController],
  providers: [SolutionService]
})
export class SolutionModule {}
