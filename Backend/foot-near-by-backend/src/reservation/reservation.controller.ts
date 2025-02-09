import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: Partial<CreateReservationDto> ) {
    return this.reservationService.create(createReservationDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @Get('user/:id')
  find(@Param('id') id: string) {
    return this.reservationService.findByUserId(+id);
  }

  @Get('manager/:id')
  findReservationsByManager(@Param('id') responsibleId: string) {
    return this.reservationService.findReservationsByManager(+responsibleId);
  }

  @Get('pitch/:id')
  findReservationsByPitch(@Param('id') pitchId: string) {
    return this.reservationService.findReservationByPitch(+pitchId);
  }

  //Not yet implemented
  @Get()
  findAll() {
    return this.reservationService.findAll();
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
