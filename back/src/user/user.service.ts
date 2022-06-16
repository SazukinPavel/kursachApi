import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import { AuthorBio } from 'src/entitys/AuthorBio.entity';
import { User } from 'src/entitys/User.entity';
import { RoleType } from 'src/types/RoleType';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/AddUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UpdateUserNameDto } from './dto/UpdateUserName.dto';
import { UpdateUserPasswordDto } from './dto/UpdateUserPassword.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepo:Repository<User>){}

    add(addUserDto:AddUserDto){
        return this.userRepo.save(addUserDto)
    }

    findByName(name:string){
        return this.userRepo.findOne({where:{name}})
    }

    findByEmail(email:string){
        return this.userRepo.findOne({where:{email}})
    }

    findByNameOrEmail(nameOrEmail:string){
        return Promise.all([this.findByName(nameOrEmail),this.findByEmail(nameOrEmail)])
    }

    findById(id:string){
        return this.userRepo.findOne(id)
    }

    getUsers(){
        return this.userRepo.find()
    }

    deleteById(id){
        return this.userRepo.delete(id)
    }

    async updateUser({password,name}:UpdateUserDto,user:User){
        const hashPassw=await hash(password,10)
        return this.userRepo.update(user.id,{password:hashPassw,name})
    }

    async updateUserName({name}:UpdateUserNameDto,user:User){
        await this.userRepo.update(user.id,{name})
        return user
    }

    async updateUserPassword({newPassword,oldPassword}:UpdateUserPasswordDto,user:User){
        const passwordEqual=await compare(oldPassword,user.password)
        console.log(passwordEqual);
        console.log(newPassword);
        console.log(oldPassword);
        console.log(user);
        
        if(!passwordEqual){
            throw new HttpException('Старый пароль не правильный',HttpStatus.BAD_REQUEST)
        }
        const newHashPassword=await hash(newPassword,10)
        await this.userRepo.update(user.id,{password:newHashPassword})
        return user
    }

    getByRole(role:RoleType){
        return this.userRepo.find({where:{role}})
    }


    async confirmEmail(id:string){
        return this.userRepo.update(id,{isEmailConfirmed:true})
    }
    
}
