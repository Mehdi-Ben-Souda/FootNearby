import { TimeSlot } from "src/time-slot/entities/time-slot.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    @Column()
    latitude : number;
    @Column()
    longitude : number;
    @Column()
    pricePerHour : number;
    @Column()
    capacity : number;
    @Column("simple-array")
    images: string[];


    //associations
    @OneToMany(() => TimeSlot, timeSlot => timeSlot.pitch)
    timeSlots: TimeSlot[];

    constructor(user:Partial<Pitch>) {
        Object.assign(this,user)
    }
}
