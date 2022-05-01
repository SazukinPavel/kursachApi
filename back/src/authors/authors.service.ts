import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/entitys/Author.entity';
import { AuthorBio } from 'src/entitys/AuthorBio.entity';
import { User } from 'src/entitys/User.entity';
import { ResponseConstructorService } from 'src/response-constructor/response-constructor.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { UpdateAuthorDto } from './dto/UpdateAuthor.dto';

@Injectable()
export class AuthorsService {

    constructor(
    @InjectRepository(Author)private authorRepo:Repository<Author>,
    @InjectRepository(AuthorBio) private authorBioRepo:Repository<AuthorBio>,
    private userService:UserService,
    private responseConstructor:ResponseConstructorService){}

    async getAuthors(){
        const authors= await this.userService.getByRole('AUTHOR')
        return await Promise.all(authors.map((author)=>{
           return this.getAuthorById(author.id)
        }))
    }

    async getAuthorById(id:string){
        const user=await this.userService.findById(id)
        const bio=await this.authorBioRepo.findOne({where:{user:id}})
        user.bio=bio
        const courses=(await this.authorRepo.find({where:{user},relations:['course']})).map(c=>c.course)
        return this.responseConstructor.constructAuthorResponse(user,courses)
    }

    updateAuthor(updateAuthorDto:UpdateAuthorDto,user:User){
        return this.updateOrCreateAuthorBio(updateAuthorDto,user)
    }

    findBioByUser(user:User){
        return this.authorBioRepo.findOne({where:{user}})
    }

    private async updateOrCreateAuthorBio(updateAuthorDto:UpdateAuthorDto,user:User){
        const bio=await this.findBioByUser(user)
        if(bio){
            return this.authorBioRepo.update(bio.id,{bio:updateAuthorDto.bio})
        }
        return this.authorBioRepo.save({user,bio:updateAuthorDto.bio})
    }
}
