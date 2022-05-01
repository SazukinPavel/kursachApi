import { Injectable} from '@nestjs/common';
import { Course } from 'src/entitys/Course.entity';
import { User } from 'src/entitys/User.entity';
import { AuthorResponse } from 'src/types/AuthorResponse';
import { CourseInfo } from 'src/types/CourseInfo';
import { CourseResponseDto } from 'src/types/CourseResponse';

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

    construcCourseInfo({name,id,description}:Course):CourseInfo{
        return {name,id,description}
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

}
