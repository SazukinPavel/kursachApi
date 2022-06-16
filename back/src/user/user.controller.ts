import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { Role } from 'src/decorators/Role.decorator';
import { GetUser } from 'src/decorators/User.decorator';
import { User } from 'src/entitys/User.entity';
import { RoleGuard } from 'src/guards/role.guard';
import { AddUserDto } from './dto/AddUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UpdateUserNameDto } from './dto/UpdateUserName.dto';
import { UpdateUserPasswordDto } from './dto/UpdateUserPassword.dto';
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
    @Role(["ADMIN"])
    deleteUserById(@Param('id') id:string){
        return this.userService.deleteById(id)
    }

    @Put()
    @Role(['ADMIN'])
    @UsePipes(new ValidationPipe())
    updateAuthor(@Body() updateUserDto:UpdateUserDto,@GetUser() user:User){
        return this.userService.updateUser(updateUserDto,user)
    }  

    @Put('name')
    @Role(['ALL'])
    @UsePipes(new ValidationPipe())
    updateUserName(@Body() updateUserName:UpdateUserNameDto,@GetUser() user:User){
        return this.userService.updateUserName(updateUserName,user)
    }

    @Put('password')
    @Role(['ALL'])
    @UsePipes(new ValidationPipe())
    updateUserPassword(@Body() updateUserPasswordDto:UpdateUserPasswordDto,@GetUser() user:User){
        return this.userService.updateUserPassword(updateUserPasswordDto,user)
    }
    
    @Post()
    @Role(["ADMIN"])
    @UsePipes(new ValidationPipe())
    addUser(@Body() addUserDto:AddUserDto){
        return this.userService.add(addUserDto)
    }

}
