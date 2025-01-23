import { Injectable } from '@nestjs/common';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';
import { Day } from './entities/day';
import { SlotStatus } from 'src/enums';
import { QueryFailedError, Repository } from 'typeorm';
import { TimeSlot } from './entities/time-slot.entity';
import { Pitch } from 'src/pitch/entities/pitch.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TimeSlotService {
  constructor(@InjectRepository(TimeSlot) private readonly timeSlotRepository: Repository<TimeSlot>) {}

  async generateSlotsForDay(
    date: string | Date,
    pitch: Pitch
  ): Promise<TimeSlot[]> {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;

    const newSlots = Array.from({ length: 24 }, (_, i) => {
      const slot = new TimeSlot();
      const slotDate = new Date(Date.UTC(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), i, 0, 0, 0));
      slot.pitch = pitch;
      slot.date = new Date(Date.UTC(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate()));
      slot.startHour = slotDate.getTime();
      slot.status = SlotStatus.FREE;
      return slot;
    });

    try {
      const instertionResult = await this.timeSlotRepository.insert(newSlots);
      return newSlots;
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('duplicate key value')) {
        // Handle unique constraint violation
        console.error('Unique constraint violation:', error.message);
        throw new Error('A time slot with the same start hour, date, and pitch already exists.');
      } else {
        // Handle other errors
        throw error;
      }
    }

  }

  async loadSlotsForDay( date: string | Date, pitch: Pitch): Promise<TimeSlot[]> {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;

    // Charger les slots depuis la base de données
    const slots = await this.timeSlotRepository.find({
      where: {
        date: parsedDate,
      },
      relations: ['pitch'],
    });

    return slots;
  }

  findOne(id: number) {
    return  this.timeSlotRepository.findOneBy({id});
  }

  update(id: number, updateTimeSlotDto: UpdateTimeSlotDto) {
    this.timeSlotRepository.findOneBy({id}).then((value) => {
      if (value) {
        this.timeSlotRepository.update(id, updateTimeSlotDto);
      }
      else {
        throw new Error('Time slot not found');
      }
    });
    
    return `This action updates a #${id} timeSlot`;
  }

  /*create(createTimeSlotDto: CreateTimeSlotDto) {
    return 'This action adds a new timeSlot';
  }

  findAll() {
    return `This action returns all timeSlot`;
  }

  

  

  remove(id: number) {
    return `This action removes a #${id} timeSlot`;
  }*/
}
