import {Body, ConflictException, Controller, Post, Res} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { Response } from 'express';
import { emitWarning } from 'process';
import {User} from "../user/entities/user.entity";
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post("register")
    async register(@Body() body: { email: string, password: string ,username:string },@Res() response: Response){
        if(await this.authService.isEmailAlreadyUsed(body.email))
            return response.status(400).json({ message: 'Invalid credentials' });
        const user =await this.authService.register(body.email, body.password,body.username,response);
        const loginResult = await this.authService.login(user);
        return response.status(200).json( {
            message: 'register successful',
            access_token: loginResult.access_token,
        });
    }

    @Post("login")
    async login(@Body() body: { email: string, password: string  }, @Res() response: Response){
        const user=await this.authService.valideUser(body.email,body.password);
        if(!user)
            return response.status(400).json({ message: 'Invalid credentials' });
        const loginResult = await this.authService.login(user);
        return response.status(200).json( {
            message: 'Login successful',
            access_token: loginResult.access_token,
        });
    }
}
