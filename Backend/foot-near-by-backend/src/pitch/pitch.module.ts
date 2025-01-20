import { Module } from '@nestjs/common';
import { PitchController } from './pitch.controller';
import { PitchService } from './pitch.service';
import { Pitch } from './entities/pitch.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pitch]), TypeOrmModule.forFeature([User])],
  controllers: [PitchController],
  providers: [PitchService],
  exports: [PitchService],
})
export class PitchModule { }
