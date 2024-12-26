import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import { PitchModule } from './pitch/pitch.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, DatabaseModule, UserModule, PitchModule, LocationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
