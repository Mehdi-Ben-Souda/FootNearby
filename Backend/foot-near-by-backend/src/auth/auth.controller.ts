import {Body, ConflictException, Controller, Post, Res} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { Response } from 'express';
import { emitWarning } from 'process';
import {User} from "../user/entities/user.entity";
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post("register")
    register(@Body() body: { email: string, password: string ,username:string },@Res() response: Response){
            return this.authService.register(body.email, body.password,body.username,response);
    }

    @Post("login")
    login(@Body() body: { email: string, password: string  }, @Res() response: Response){
        return this.authService.login(body.email,body.password,response)
    }
}
