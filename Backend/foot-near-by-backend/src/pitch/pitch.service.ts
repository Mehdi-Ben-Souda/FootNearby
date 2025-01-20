import { Injectable } from '@nestjs/common';
import { Pitch } from './entities/pitch.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, Repository } from 'typeorm';
import { Point } from "geojson";
import { CreatePitchDto } from './dto/create-pitch.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PitchService {

    constructor(
        @InjectRepository(Pitch) private readonly pitchRepository: Repository<Pitch>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }
    async createPitch(pitchDto: CreatePitchDto) {

        var user = await this.userRepository.findOneBy({ id: pitchDto.createdBy });
        var newPitch = Pitch.fromDto(pitchDto, user);
        return this.pitchRepository.save(newPitch);
    }

    modifyPitch(id: number, newPitch: Partial<Pitch>) {
        return this.pitchRepository.update(id, newPitch);
    }

    deletePitch(pitchId: number) {
        return this.pitchRepository.delete(pitchId);
    }

    getAllPitches() {
        return this.pitchRepository.find();
    }

    getPitchById(pitchId: number) {
        return this.pitchRepository.findOneBy({ id: pitchId });
    }

    getPitchesByUserId(userId: number) {
        return this.pitchRepository.find({
            where: { createdBy: { id: userId } },
        });
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
