import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PitchService } from './pitch.service';
import { Pitch } from './entities/pitch.entity';

@Controller('pitch')
export class PitchController {

    constructor(private readonly pitchService: PitchService) {}
    @Post('add')
    createPitch(@Body() pitch: Pitch) {
        return this.pitchService.createPitch(pitch);
    }

    @Put('modify')
    modifyPitch(@Body() pitch: Pitch) {
        return this.pitchService.modifyPitch(pitch);
    }

    @Get('get')
    getAllPitches() {
        return this.pitchService.getAllPitches();
    }
    @Get('getById/:id')
    getPitchById(@Param('id') id: number) {
        return this.pitchService.getPitchById(id);
    }

    @Delete('delete')
    deletePitch(@Body() pitchId: number) {
        return this.pitchService.deletePitch(pitchId);
    }
}
