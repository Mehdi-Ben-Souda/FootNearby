import { TimeSlot } from "src/time-slot/entities/time-slot.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Point} from "geojson";
import { User } from "src/user/entities/user.entity";

@Entity("pitch")
export class Pitch {
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    name : string;
    @Column()
    description : string;
    @Column()
    address : string;

    @Column({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326
    })
    location: Point;
    @Column()
    pricePerHour : number;
    @Column()
    capacity : number;
    @Column("simple-array")
    images: string[];


    //associations
    @OneToMany(() => TimeSlot, timeSlot => timeSlot.pitch)
    timeSlots: TimeSlot[];
    @ManyToOne(() => User, user => user.pitches, { eager: true })
    createdBy: User;

    constructor(user:Partial<Pitch>) {
        Object.assign(this,user)
    }

    setCoordinates(latitude: number, longitude: number) {
        this.location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };
    }
}
