import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserResponseDto} from "../dto/response-user-dtp";
import {UserRole} from "../enum/role_user-enum";

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

    constructor(user:Partial<User>) {
        Object.assign(this,user)
    }

    public toUserResponseDto()
    {
        return new UserResponseDto(this.id,this.name,this.email,this.phoneNumber,this.role,this.image);
    }
}
