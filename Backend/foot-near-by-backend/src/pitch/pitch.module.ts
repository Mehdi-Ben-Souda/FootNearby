import { Module } from '@nestjs/common';
import { PitchController } from './pitch.controller';
import { PitchService } from './pitch.service';
import { Pitch } from './entities/pitch.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Pitch])],
  controllers: [PitchController],
  providers: [PitchService],
  exports: [PitchService],
})
export class PitchModule {}
