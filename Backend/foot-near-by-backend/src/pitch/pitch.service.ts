import { Injectable } from '@nestjs/common';
import { Pitch } from './entities/pitch.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {Column, Repository} from 'typeorm';
import {Point} from "geojson";

@Injectable()
export class PitchService {

    constructor(@InjectRepository(Pitch) private readonly pitchRepository :Repository<Pitch>,
 ) {}
    createPitch(newPitch:Pitch) {
        return this.pitchRepository.save(newPitch);
    }

    modifyPitch(newPitch:Pitch) {
        return this.pitchRepository.update(newPitch.id,newPitch);
    }

    deletePitch(pitchId:number) {
        return this.pitchRepository.delete(pitchId);
    }

    getAllPitches() {
        return this.pitchRepository.find();
    }

    getPitchById(pitchId:number) {
        return this.pitchRepository.findOneBy({id:pitchId});
    }

    async pitchWithinRadius(center: Point, radiusInKm: number, limit: number = 10) {
        console.log('Center:', center);

        return await this.pitchRepository.createQueryBuilder("pitch")
            .select([
                "pitch.id",           // Prefixing with 'pitch.'
                "pitch.name",
                "pitch.description",
                "pitch.pricePerHour",
                "pitch.address",
                "pitch.location",
                "pitch.capacity",
                "pitch.images",
                `ST_Distance(
                pitch.location::geography,
                ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography
            ) as distance`
            ])
            .where(
                `ST_DWithin(
                pitch.location::geography,
                ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography,
                :radius
            )`
            )
            .setParameters({
                longitude: center.coordinates[1], // Longitude from center
                latitude: center.coordinates[0],  // Latitude from center
                radius: radiusInKm * 1000 // Convert kilometers to meters
            })
            .orderBy("distance", "ASC")
            .limit(limit)
            .getRawMany();
    }

}
