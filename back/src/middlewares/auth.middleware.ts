import { Injectable, NestMiddleware } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "src/key";
import { User } from "src/entitys/User.entity";
import { Request } from "src/types/Request";
import { UserService } from "src/user/user.service";


@Injectable()
export class AuthMiddleware implements NestMiddleware{
    
    constructor(private userService:UserService){}

    async use(req: Request, res: any, next: (error?: any) => void) {
        req.user=null
        const token=req.headers.get('token')
        if(token){
            const jwtUser=verify(token,SECRET_KEY) as User
            if(jwtUser){
                const user=await this.userService.findById(jwtUser.id)
                req.user=user
            }
        }
        next()
    }

}