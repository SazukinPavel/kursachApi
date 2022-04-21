import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "src/types/Request";
import { RoleKey } from "src/types/RoleType";


export class RoleGuard implements CanActivate{

    constructor(private reflector:Reflector){}
    
    canActivate(context: ExecutionContext):boolean {
        const user=context.switchToHttp().getRequest<Request>().user
        const role=this.reflector.get(RoleKey,context.getHandler())
        if(user && user.role===role){
            return true
        }
        return false
    }


}