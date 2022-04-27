import { Body, Controller, Delete, Get, Param, Put, UseGuards} from '@nestjs/common';
import { Role } from 'src/decorators/Role.decorator';
import { GetUser } from 'src/decorators/User.decorator';
import { User } from 'src/entitys/User.entity';
import { RoleGuard } from 'src/guards/role.guard';
import { UpdateAuthorDto } from './dto/UpdateAuthor.dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(RoleGuard)
export class UserController {

    constructor(private userService:UserService){}

    @Get()
    @Role(['ALL'])
    getUsers(){
        return this.userService.getUsers() 
    }

    @Get('id')
    @Role(['ALL'])
    findUserById(@Param('id') id:string){
        return this.userService.findById(id)
    }

    @Delete('id')
    @UseGuards(RoleGuard)
    @Role(["ADMIN"])
    deleteUserById(@Param('id') id:string){
        return this.userService.deleteById(id)
    }

    @Put()
    @Role(['AUTHOR'])
    updateAuthor(@Body() updateAuthorDto:UpdateAuthorDto,@GetUser() user:User){
        return this.userService.updateAuthor(updateAuthorDto,user)
    }    
}
