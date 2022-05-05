import { Injectable} from '@nestjs/common';
import { Course } from 'src/entitys/Course.entity';
import { Task } from 'src/entitys/Task.entity';
import { User } from 'src/entitys/User.entity';
import { AuthorResponse } from 'src/types/ReponseTypes/AuthorResponse';
import { CourseInfo } from 'src/types/CourseInfo';
import { CourseResponseDto } from 'src/types/ReponseTypes/CourseResponse';
import { TaskResponse } from 'src/types/ReponseTypes/TaskResponse';
import { Solution } from 'src/entitys/Solution.entity';
import { SolutionResponse } from 'src/types/ReponseTypes/SolutionResponse';

@Injectable()
export class ResponseConstructorService {
    
    constructCoursesResponse(courses:Course[] ){
        return courses.map((course):CourseResponseDto=>{
            return this.constructCourseResponse(course)
        })
    }

    constructCourseResponse({name,id,authors,description}:Course):CourseResponseDto{        
        const rightAuthors=authors.map((author)=>(author.user))
        return {name,id,authors:rightAuthors,description}
    }

    construcCourseInfo(course:Course):CourseInfo{
        return {...course}
    }

    constructAuthorResponse(user:User,courses:Course[]){
        const authorResponse:AuthorResponse={...user,bio:user?.bio?.bio}
        const authorCourses:CourseInfo[]=[]
        courses.forEach(c=>{
            if(c!=null){
                authorCourses.push(this.construcCourseInfo(c))
            }
        })
        authorResponse.courses=authorCourses
        return authorResponse
    }

    cronstructTaskResponse(task:Task):TaskResponse{
        const course=this.construcCourseInfo(task.course)
        return {...task,course}
    }

    constructSolutionResponse(solution:Solution):SolutionResponse{
        const task=this.cronstructTaskResponse(solution.task)
        return {...solution,task}
    }

    constructSolutionsResponse(solutions:Solution[]):SolutionResponse[]{
        return solutions.map((s)=>this.constructSolutionResponse(s))
    }
}
