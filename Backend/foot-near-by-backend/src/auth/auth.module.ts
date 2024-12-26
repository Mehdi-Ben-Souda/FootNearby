import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
@Module({
  imports:[
      UserModule,
    JwtModule.register({
      secret: '57d2da4720960a37f3fceb52f5738b922036486262d371cb7c2d8048d3d83b36', // Hardcoded JWT secret
      signOptions: { expiresIn: '60m' }, // Token expiration time
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
