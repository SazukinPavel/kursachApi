import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "src/types/Request";

@Injectable()
export class AuthGuard implements CanActivate{
    
    canActivate(context: ExecutionContext): boolean{
        const user=context.switchToHttp().getRequest<Request>().user
        if(user){
            return true
        }
        return false
    }
}