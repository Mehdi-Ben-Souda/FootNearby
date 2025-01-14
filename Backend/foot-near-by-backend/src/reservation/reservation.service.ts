import { HttpException, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { TimeSlotService } from 'src/time-slot/time-slot.service';
import { ReservationStatus, SlotStatus } from 'src/enums';

@Injectable()
export class ReservationService {

  constructor(private readonly useService: UserService,
    private readonly timeSlotService: TimeSlotService,
    @InjectRepository(Reservation) private readonly reservationRepository: Repository<Reservation>) { }

  async create(createReservationDto: Partial<CreateReservationDto>) {
    const user = await this.useService.findOne(createReservationDto.userId);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const timeSlot = await this.timeSlotService.findOne(createReservationDto.timeSlotId);
    if (!timeSlot) {
      throw new HttpException('Time slot not found', 404);
    }

    if (timeSlot.status !== SlotStatus.FREE) {
      throw new HttpException('Time slot is not available', 400);
    }


    const reservation = this.reservationRepository.create({
      reservationDate: new Date(),
      status: ReservationStatus.OK,
      user: user,
      timeSlot: timeSlot
    });
    // Save the reservation
    const savedReservation = await this.reservationRepository.save(reservation);
    // Update the time slot status
    await this.timeSlotService.update(timeSlot.id, { status: SlotStatus.RESERVED });
  
    return savedReservation;
  }

  findByUserId(userId: number): Promise<Reservation[]> {
    const response = this.useService.findOne(userId);
    var myUser = null;
    response.then((user) => {
      if (!user) {
        return new HttpException('User not found', 404);
      }
      myUser = user;
    })

    return this.reservationRepository.find({
      where: {
        user: myUser
      }
    });
  }


  findAll() {
    return `This action returns all reservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
