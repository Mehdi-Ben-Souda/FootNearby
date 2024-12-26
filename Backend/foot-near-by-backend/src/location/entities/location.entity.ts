import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("location")
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

}
