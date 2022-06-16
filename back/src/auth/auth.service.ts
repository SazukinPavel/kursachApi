import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { User } from 'src/entitys/User.entity';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/Login.dto';
import { RegistrDto } from './dto/Registr.dto';
import { UserResponse } from './dto/UserResponse.response-dto';

@Injectable()
export class AuthService {

    constructor(private userService:UserService,
        private configService:ConfigService,
        private mailService:MailService
    ){}

    async registr({email,name,password,role}:RegistrDto){
        if(!(role==="AUTHOR" || role==='USER')){
            throw new HttpException('Роль может быть USER или AUTHOR',HttpStatus.BAD_REQUEST)
        }
        const userWithSameEmail=await this.userService.findByEmail(email)
        if(userWithSameEmail){
            throw new HttpException('Пользователь с таким email\'ом уже существует',HttpStatus.BAD_REQUEST)
        }
        const userWithSameName=await this.userService.findByName(name)
        if(userWithSameName){
            throw new HttpException('Пользователь с таким именем уже существует',HttpStatus.BAD_REQUEST)
        }
        const hashPassword=await hash(password,10)
        const user=await this.userService.add({name,email,password:hashPassword,role})
        await this.mailService.sendUserConfirmation(user, this.generateToken(user));
        return user
    }

    async login({emailOrName,password}:LoginDto){
        const [userWithSameName,userWithSameEmail]=await this.userService.findByNameOrEmail(emailOrName)
        if(!userWithSameEmail && !userWithSameName){
            throw new HttpException('Пользователя с таким email\'ом или именем не существует',HttpStatus.BAD_REQUEST)
        }
        const user=userWithSameEmail ?? userWithSameName
        if(user.isEmailConfirmed===false){
            throw new HttpException('Проверьте почту и подтвердите email',HttpStatus.BAD_REQUEST)
        }
        const isPasswordEqual=await compare(password,user.password)
        if(!isPasswordEqual){
            throw new HttpException('Неправильный пароль',HttpStatus.NOT_ACCEPTABLE)
        }
        return this.generateResponse(user)
    }

    async confirmEmail(token:string){
        if(token){
            const jwtUser=verify(token,this.configService.get('APP_SECRET_KEY')) as User
            if(jwtUser){
                const user=await this.userService.findById(jwtUser.id)
                if(user===null){
                    throw new HttpException('Такого пользователя нет',HttpStatus.NOT_ACCEPTABLE)
                }
                if(user.isEmailConfirmed){
                    throw new HttpException('Почта уже подтверждена',HttpStatus.BAD_REQUEST)
                }
                this.userService.confirmEmail(user.id)
                return {message:"Ваша почта подтверждена"}
            }
        }
        return null
    }

    private generateToken(user:User){
        return sign({id:user.id,role:user.role},this.configService.get('APP_SECRET_KEY'))
    }

    private generateResponse(user:User):UserResponse{
        return {token:this.generateToken(user),user}
    }
}
