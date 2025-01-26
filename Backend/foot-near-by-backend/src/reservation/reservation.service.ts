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

  async findByUserId(userId: number): Promise<Reservation[]> {
    const user = await this.useService.findOne(userId);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return this.reservationRepository.find({
      where: { user },
      relations: ['timeSlot', 'timeSlot.pitch'],
      order: {
        reservationDate: 'DESC', 
      },
    });
  }

  async findReservationsByManager(responsibleId: number): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.find({
      where: {
        timeSlot: {
          pitch: {
            createdBy: { id: responsibleId },
          },
        },
      },
      relations: ['user', 'timeSlot', 'timeSlot.pitch'],
      order: { reservationDate: 'DESC' },
    });
  
    return reservations;
  }

  async findReservationByPitch(pitchId: number): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.find({
      where: {
        timeSlot: {
          pitch: {
            id: pitchId, // Filtrer par l'ID du terrain
          },
        },
      },
      relations: ['user', 'timeSlot', 'timeSlot.pitch'],
      order: { reservationDate: 'DESC' },
    });
  
    return reservations;
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find({
      relations: ['user', 'timeSlot'],
    });
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['user', 'timeSlot'],
    });

    if (!reservation) {
      throw new HttpException(`Reservation with ID ${id} not found`, 404);
    }

    return reservation;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  async remove(id: number): Promise<void> {
    const reservation = await this.findOne(id);

    await this.timeSlotService.update(reservation.timeSlot.id, { status: SlotStatus.FREE });

    await this.reservationRepository.remove(reservation);
  }
}
