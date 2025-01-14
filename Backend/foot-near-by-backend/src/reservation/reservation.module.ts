import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { UserModule } from 'src/user/user.module';
import { TimeSlotModule } from 'src/time-slot/time-slot.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]),UserModule,TimeSlotModule],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
