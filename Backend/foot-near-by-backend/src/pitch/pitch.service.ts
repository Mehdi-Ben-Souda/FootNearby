import { Injectable } from '@nestjs/common';
import { Pitch } from './entities/pitch.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
        return this.pitchRepository.findBy({id:pitchId});
    }
}
