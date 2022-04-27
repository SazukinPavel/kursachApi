import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorBio } from 'src/entitys/AuthorBio.entity';
import { User } from 'src/entitys/User.entity';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/AddUser.dto';
import { UpdateAuthorDto } from './dto/UpdateAuthor.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepo:Repository<User>,
    @InjectRepository(AuthorBio) private authorBioRepo:Repository<AuthorBio>){}

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

    updateAuthor(updateAuthorDto:UpdateAuthorDto,author:User){
        return this.updateOrCreateAuthorBio(updateAuthorDto,author)
    }

    private async updateOrCreateAuthorBio(updateAuthorDto:UpdateAuthorDto,user:User){
        const bio=await this.authorBioRepo.findOne({where:{user}})
        if(!bio){
            return this.authorBioRepo.update(bio.id,{bio:updateAuthorDto.bio})
        }
        return this.authorBioRepo.save({...updateAuthorDto})
    }
}
