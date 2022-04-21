import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from 'src/key';
import { User } from 'src/entitys/User.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/Login.dto';
import { RegistrDto } from './dto/Registr.dto';
import { UserResponse } from './dto/UserResponse.response-dto';

@Injectable()
export class AuthService {

    constructor(private userService:UserService){}

    async registr({email,name,password,role}:RegistrDto){
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
        return this.generateResponse(user)
    }

    async login({emailOrName,password}:LoginDto){
        const [userWithSameName,userWithSameEmail]=await this.userService.findByNameOrEmail(emailOrName)
        if(!userWithSameEmail && !userWithSameName){
            throw new HttpException('Пользователя с таким email\'ом или именем не существует',HttpStatus.BAD_REQUEST)
        }
        const user=userWithSameEmail ?? userWithSameName
        const isPasswordEqual=await compare(password,user.password)
        if(!isPasswordEqual){
            throw new HttpException('Неправильный пароль',HttpStatus.NOT_ACCEPTABLE)

        }
        return this.generateResponse(user)
    }

    private generateToken(user:User){
        return sign({id:user.id,role:user.role},SECRET_KEY)
    }

    private generateResponse(user:User):UserResponse{
        delete user.password
        return {token:this.generateToken(user),user}
    }

}
