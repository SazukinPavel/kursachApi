import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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

    @Post('registr')
    @UsePipes(new ValidationPipe())
    registr(@Body() registrDto:RegistrDto){
        return this.authService.registr(registrDto)
    }

}
