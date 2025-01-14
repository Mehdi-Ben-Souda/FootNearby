import { Module } from '@nestjs/common';
import { TimeSlotService } from './time-slot.service';
import { TimeSlotController } from './time-slot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSlot } from './entities/time-slot.entity';
import { PitchModule } from 'src/pitch/pitch.module';

@Module({
  imports:[TypeOrmModule.forFeature([TimeSlot]),PitchModule],
  controllers: [TimeSlotController],
  providers: [TimeSlotService],
  exports:[TimeSlotService]
})
export class TimeSlotModule {}
