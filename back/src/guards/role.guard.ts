import { RoleParam } from './../types/RoleType';
import { CanActivate, ExecutionContext, Injectable,  } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "src/types/Request";
import { RoleKey } from "src/types/RoleType";

@Injectable()
export class RoleGuard implements CanActivate{

    constructor(private reflector:Reflector){}
    
    canActivate(context: ExecutionContext):boolean {
        const user=context.switchToHttp().getRequest<Request>().user
        const roles:RoleParam[]=this.reflector.get(RoleKey,context.getHandler())
        if(roles.includes('ALL') && user){
            return true
        }else if(user && roles.includes(user.role)){
            return true
        }
        return false
    }


}