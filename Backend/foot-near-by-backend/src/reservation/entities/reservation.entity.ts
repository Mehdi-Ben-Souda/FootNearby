import { ReservationStatus } from "src/enums";
import { TimeSlot } from "src/time-slot/entities/time-slot.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: ReservationStatus,
        default: ReservationStatus.OK
    })
    status: ReservationStatus;

    @OneToOne(() => TimeSlot, timeSlot => timeSlot.reservation)
    @JoinColumn() 
    timeSlot: TimeSlot;

}
