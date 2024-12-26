import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {User} from "../user/entities/user.entity";
import {CreateUserDto} from "../user/dto/create-user.dto";
import { Response } from 'express';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private readonly useService:UserService,
        private readonly jwtService: JwtService,
    ) {
    }

    async isEmailAlreadyUsed(email:string)
    {
        const user=await this.useService.findByEmail(email);
        return user!=null;
    }

    async register(CreateUserDto){
        const newUser=await this.useService.create(CreateUserDto);
        return newUser;
    }

    async valideUser(email: string, password: string)
    {
        const user=await this.useService.findByEmail(email)
        if(!user || user.password !==password)
            return null;
        return user;

    }

    async login(user: User) {
        const payload = { name: user.name,role:user.role,x:user.phoneNumber};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
