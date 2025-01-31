import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { TimeSlotService } from './time-slot.service';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';
import { PitchService } from 'src/pitch/pitch.service';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('time-slot')
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService, private readonly pitchService: PitchService) { }

  @Post("add")
  create(@Body() body: { date: string | Date, pitchId: number }) {

    const pitch = this.pitchService.getPitchById(body.pitchId);
    pitch.then((value) => {
      try {
        return this.timeSlotService.generateSlotsForDay(body.date, value);
      }
      catch (error) {
        throw new HttpException('Error creating slots', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });

  }

  @Post("addByTime")
  createByTime(@Body() body: { date: string | Date, pitchId: number, startHour: number, endHour: number }) {

    const pitch = this.pitchService.getPitchById(body.pitchId);
    pitch.then(async (value) => {
      const result= await this.timeSlotService.generateSlotsForTime(body.date, value, body.startHour, body.endHour);
      return result;
    }
    );
  }

  @Get('get')
  async find(@Query() query: { date: string; pitchId: number }) {
    try {
      const pitch = await this.pitchService.getPitchById(query.pitchId);
      if (!pitch) {
        throw new HttpException('Pitch not found', HttpStatus.NOT_FOUND);
      }
      return await this.timeSlotService.loadSlotsForDay(query.date, pitch);
    } catch (error) {
      console.error(error);
      throw new HttpException('Error loading slots', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
