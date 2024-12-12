import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {User} from "../user/entities/user.entity";
import {CreateUserDto} from "../user/dto/create-user.dto";
import { Response } from 'express';

@Injectable()
export class AuthService {

    constructor(
        private readonly useService:UserService
    ) {
    }

    async register(email: string, password: string,username:string,response:Response){
        const user=await this.useService.findByEmail(email)
        if(user)
            return response.status(401).json({ message: 'Email is already in use'});
        const newUser=await this.useService.create(new CreateUserDto(email, password, username))
        return response.status(200).json({data:newUser});
    }

    async login(email: string, password: string,response:Response)
    {
        const user=await this.useService.findByEmail(email)
        if (!user)
            return response.status(401).json({ message: 'Invalid credentials' });
        else if(user.password!=password)
            return response.status(401).json({ message: 'Invalid credentials' });
        else
            return response.status(200).json({data:user});//should test the password after that (when we'll use JWT)
    }
}
