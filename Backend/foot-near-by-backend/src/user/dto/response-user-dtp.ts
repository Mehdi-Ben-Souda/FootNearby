import {User} from "../entities/user.entity";
import {UserRole} from "../enum/role_user-enum";

export class UserResponseDto {
    constructor(id:number,name: string, email: string, phoneNumber: string, role: UserRole, image: string) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.image = image;
        this.id=id;
    }


    id:number;
    name: string;
    email: string;
    phoneNumber:string;
    role:UserRole;
    image:string;


}