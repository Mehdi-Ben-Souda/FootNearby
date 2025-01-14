import { ReservationStatus } from "src/enums";
import { TimeSlot } from "src/time-slot/entities/time-slot.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    reservationDate: Date;

    @ManyToOne(() => User, user => user.reservations, { eager: true })
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToOne(() => TimeSlot, timeSlot => timeSlot.reservation, { eager: true })
    @JoinColumn({ name: 'timeSlotId' })
    timeSlot: TimeSlot;
}
