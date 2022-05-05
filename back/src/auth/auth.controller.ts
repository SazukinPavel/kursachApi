import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { GetUser } from 'src/decorators/User.decorator';
import { User } from 'src/entitys/User.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';
import { RegistrDto } from './dto/Registr.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() loginDto:LoginDto){
        return this.authService.login(loginDto)
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    registr(@Body() registrDto:RegistrDto){
        return this.authService.registr(registrDto)
    }

    @Get('check')
    @UseGuards(AuthGuard)
    checkToken(@GetUser() user:User){
        return user
    }

    @Get('connection')
    checkConnection(){
        return true
    }
}
