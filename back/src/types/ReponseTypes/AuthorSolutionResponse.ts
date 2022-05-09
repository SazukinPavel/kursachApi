import { ReviewResponse } from "./ReviewResponse";
import { SolutionResponse } from "./SolutionResponse";

export class AuthorSolutionResponse extends SolutionResponse{
    isHaveReview:boolean
    review:ReviewResponse
}