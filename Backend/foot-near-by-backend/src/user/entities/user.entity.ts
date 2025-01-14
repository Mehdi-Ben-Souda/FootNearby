import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserResponseDto} from "../dto/response-user-dtp";
import {UserRole} from "../enum/role_user-enum";
import { Pitch } from "src/pitch/entities/pitch.entity";
import { Reservation } from "src/reservation/entities/reservation.entity";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    phoneNumber:string;

    @Column({
        type: 'enum',
        enum:UserRole ,
        default: UserRole.Player
    })
    role:UserRole;
    @Column({ nullable: true })
    image:string;

    @OneToMany(() => Pitch, pitch => pitch.createdBy)
    pitches: Pitch[];

    @OneToMany(() => Reservation, reservation => reservation.user)
    reservations: Reservation[];

    constructor(user:Partial<User>) {
        Object.assign(this,user)
    }

    public toUserResponseDto()
    {
        return new UserResponseDto(this.id,this.name,this.email,this.phoneNumber,this.role,this.image);
    }
}
