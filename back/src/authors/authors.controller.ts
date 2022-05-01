import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { Role } from 'src/decorators/Role.decorator';
import { GetUser } from 'src/decorators/User.decorator';
import { User } from 'src/entitys/User.entity';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthorsService } from './authors.service';
import { UpdateAuthorDto } from './dto/UpdateAuthor.dto';

@Controller('authors')
@UseGuards(RoleGuard)
export class AuthorsController {

    constructor(private authorService:AuthorsService){}

    @Get()
    @Role(['ALL'])
    getAll(){
        return this.authorService.getAuthors()
    }

    @Get(':id')
    @Role(['ALL'])
    getById(@Param('id') id:string){
        return this.authorService.getAuthorById(id)
    }

    @Put()
    @Role(['AUTHOR'])
    updateAuthor(@Body() updateAuthorDto:UpdateAuthorDto,@GetUser() user:User){
        return this.authorService.updateAuthor(updateAuthorDto,user)
    }
}
