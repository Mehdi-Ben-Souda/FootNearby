import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    // Asynchronous registration of the JwtModule to access environment variables dynamically
    JwtModule.registerAsync({
      imports: [ConfigModule], // Ensure ConfigModule is imported to access environment variables
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_KEY'), // Access JWT secret from .env or provide a default value
        signOptions: { expiresIn: '60m' }, // Set token expiration time
      }),
      inject: [ConfigService], // Inject ConfigService for dependency injection
    }),
  ],
  controllers: [AuthController], // Define the AuthController for route handling
  providers: [AuthService], // Register the AuthService for dependency injection
})
export class AuthModule {}
