import { Body, Controller, Delete, Get, Param, Put, UseGuards} from '@nestjs/common';
import { Role } from 'decorators/Role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {

    constructor(private userService:UserService){}

    @Get()
    getUsers(){
        return this.userService.getUsers() 
    }

    @Get('id')
    findUserById(@Param('id') id:string){
        return this.userService.findById(id)
    }

    @Delete('id')
    @Role('ADMIN')
    @UseGuards(RoleGuard)
    deleteUserById(@Param('id') id:string){
        return this.userService.deleteById(id)
    }

    @Put()
    updateUser(@Body() updateUserDto:UpdateUserDto){
        return this.userService.update(updateUserDto)
    }    
}
