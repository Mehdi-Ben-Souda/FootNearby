import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,) { }
  create(createLocationDto: CreateLocationDto) {
    const location = this.locationRepository.create(createLocationDto);
    return this.locationRepository.save(location);
  }

  findAll() {
    const listLoc = this.locationRepository.find();
    return listLoc;
  }

  findOne(id: number) {
    const location = this.locationRepository.findOneBy({ id });
    location.then((value) => {
      console.log(value);
      return new CreateLocationDto(value);
    });
    return undefined;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    const updatedLocation = this.locationRepository.create(updateLocationDto);
    const result = this.locationRepository.update(id, updatedLocation);

    result.then((value) => {
      console.log(value);
      return value;
    });
    return `The update did not work for the location with id ${id}`;
  }

  remove(id: number) {
    const result = this.locationRepository.delete(id);

    result.then((value) => {
      console.log(value);
      return value;
    });
  }
}
