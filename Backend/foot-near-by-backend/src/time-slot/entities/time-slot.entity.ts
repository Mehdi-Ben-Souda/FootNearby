import { SlotStatus } from "src/enums";
import { Pitch } from "src/pitch/entities/pitch.entity";
import { Reservation } from "src/reservation/entities/reservation.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('slot')
@Unique(['startHour', 'date', 'pitch'])
export class TimeSlot {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('bigint')
    startHour: number;
    @Column()
    date: Date;
    @Column({
        type: 'enum',
        enum: SlotStatus,
        default: SlotStatus.FREE
    })
    status: SlotStatus;

    //associations
    @ManyToOne(() => Pitch, pitch => pitch.timeSlots)
    @JoinColumn({ name: 'pitch_id' })
    pitch: Pitch;

    @OneToOne(() => Reservation, reservation => reservation.timeSlot, {
        nullable: true
    })
    reservation: Reservation;


}
