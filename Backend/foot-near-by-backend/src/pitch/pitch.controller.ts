import {BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import { PitchService } from './pitch.service';
import { Pitch } from './entities/pitch.entity';
import {Point} from "geojson";

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

    @Get("pitchWithinRadius")
    async pitchWithinRadius(
        @Query('latitude') latitude: string,
        @Query('longitude') longitude: string,
        @Query('radius') radius: string
    ) {
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        const rad = parseFloat(radius);

        if (isNaN(lat) || isNaN(lon) || isNaN(rad)) {
            throw new BadRequestException('Invalid latitude, longitude, or radius');
        }

        console.log('Latitude:', lat);
        console.log('Longitude:', lon);
        console.log('Radius:', rad);

        const centerPoint: Point = {
            type: 'Point',
            coordinates: [lat, lon],
        };

        return await this.pitchService.pitchWithinRadius(centerPoint, rad);
    }

}
