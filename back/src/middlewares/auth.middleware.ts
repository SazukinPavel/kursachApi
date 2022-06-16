import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { verify } from "jsonwebtoken";
import { User } from "src/entitys/User.entity";
import { Request } from "src/types/Request";
import { UserService } from "src/user/user.service";


@Injectable()
export class AuthMiddleware implements NestMiddleware{
    
    constructor(private userService:UserService,
        private configService:ConfigService){}

    async use(req: Request, res: any, next: (error?: any) => void) {
        req.user=null
        const token=req.headers['authorization']
        if(token){
            const jwtUser=verify(token,this.configService.get('APP_SECRET_KEY')) as User
            if(jwtUser){
                const user=await this.userService.findById(jwtUser.id)
                req.user=user
            }
        }
        next()
    }

}