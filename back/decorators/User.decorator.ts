import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/entitys/User.entity";
import { Request } from "src/types/Request";

export const GetUser=createParamDecorator((param:string,ctx:ExecutionContext):User | null=>{
    const user=ctx.switchToHttp().getRequest<Request>().user
    if(user){
        return user[param] ?? user
    }
    return null
})