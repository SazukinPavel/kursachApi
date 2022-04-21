import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'decorators/Role.decorator';
import { User } from 'src/entitys/User.entity';
import { RoleGuard } from 'src/guards/role.guard';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/AddUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

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
        return this.userRepo.findOne({id})
    }

    getUsers(){
        return this.userRepo.find()
    }

    update({id,...dto}:UpdateUserDto){
        return this.userRepo.update(id,{...dto})
    }

    deleteById(id){
        return this.userRepo.delete(id)
    }
}
