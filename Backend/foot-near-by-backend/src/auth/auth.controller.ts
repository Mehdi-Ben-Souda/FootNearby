import {Body, ConflictException, Controller, Post, Res} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { Response } from 'express';
import { emitWarning } from 'process';
import {User} from "../user/entities/user.entity";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserResponseDto} from "../user/dto/response-user-dtp";
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post("register")
    async register(@Body() createUserDto: CreateUserDto,@Res() response: Response){
        console.log("register");
        if(await this.authService.isEmailAlreadyUsed(createUserDto.email))
            return response.status(400).json({ message: 'Invalid credentials' });
        const user =await this.authService.register(createUserDto);
        const loginResult = await this.authService.login(user);
        return response.status(200).json( {
            message: 'register successful',
            access_token: loginResult.access_token,
            user:user.toUserResponseDto()
        });
    }

    @Post("login")
    async login(@Body() body: { email: string, password: string  }, @Res() response: Response){
        console.log("Login");
        const user=await this.authService.valideUser(body.email,body.password);
        console.log(user)
        if(!user)
            return response.status(400).json({ message: 'Invalid credentials' });
        const loginResult = await this.authService.login(user);
        console.log(loginResult);
        return response.status(200).json( {
            message: 'Login successful',
            access_token: loginResult.access_token,
            user:user.toUserResponseDto()
        });
    }
}
