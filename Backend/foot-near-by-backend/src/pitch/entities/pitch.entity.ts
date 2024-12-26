import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Point} from "geojson";

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
