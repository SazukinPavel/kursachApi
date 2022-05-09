import { Injectable} from '@nestjs/common';
import { Course } from 'src/entitys/Course.entity';
import { Task } from 'src/entitys/Task.entity';
import { User } from 'src/entitys/User.entity';
import { AuthorResponse } from 'src/types/ReponseTypes/AuthorResponse';
import { CourseInfo } from 'src/types/CourseInfo';
import { CourseResponseDto } from 'src/types/ReponseTypes/CourseResponse';
import { Solution } from 'src/entitys/Solution.entity';
import { SolutionResponse } from 'src/types/ReponseTypes/SolutionResponse';
import { TaskResponse } from 'src/types/ReponseTypes/TaskResponse';
import { TaskAuthorResponse } from 'src/types/ReponseTypes/TaskAuthorResponse';
import { TaskUserResponse } from 'src/types/ReponseTypes/TaskUserResponse';
import { Review } from 'src/entitys/Review.entity';
import { ReviewResponse } from 'src/types/ReponseTypes/ReviewResponse';
import { AuthorSolutionResponse } from 'src/types/ReponseTypes/AuthorSolutionResponse';

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

    constructTaskUserResponse(task:Task & {isHaveSolution:boolean}):TaskUserResponse{
        return {...this.constructTaskResponse(task),isHaveSolution:task.isHaveSolution}
    }

    constructTaskResponse(task:Task):TaskResponse{
        const course=this.construcCourseInfo(task?.course)
        return {...task,course}
    }

    constructTaskAuthorResponse(task:Task):TaskAuthorResponse{
        return {...this.constructTaskResponse(task)}
    }

    constructSolutionResponse(solution:Solution):SolutionResponse{
        const task=this.constructTaskResponse(solution?.task)
        return {...solution,task}
    }

    constructAuthorSolutionResponse(solution:Solution):AuthorSolutionResponse{
        let review=undefined
        if(solution.review){
            review=this.constructReviewResponse(solution?.review)
        }
        return {...this.constructSolutionResponse(solution),isHaveReview:review!==undefined,review}
    }

    constructSolutionsResponse(solutions:Solution[]):SolutionResponse[]{
        return solutions.map((s)=>this.constructSolutionResponse(s))
    }
    
    constructAuthorSolutionsResponse(solutions:Solution[]):AuthorSolutionResponse[]{
        return solutions.map((s)=>this.constructAuthorSolutionResponse(s))
    }

    constructReviewResponse(review:Review):ReviewResponse{
        const solution=this.constructSolutionResponse(review?.solution)
        return {...review,solution}
    }

    constructReviewsResponse(reviews:Review[]):ReviewResponse[]{
        return reviews.map((r)=>this.constructReviewResponse(r))
    }

    
}
