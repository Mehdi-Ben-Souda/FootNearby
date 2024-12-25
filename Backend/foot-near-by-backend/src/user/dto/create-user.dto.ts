import {Column} from "typeorm";
import {UserRole} from "../enum/role_user-enum";

export class CreateUserDto {
    constructor(name: string, email: string, password: string, phoneNumber: string,role:UserRole) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.role=role;
    }

    name: string;
    email: string;
    password: string;
    phoneNumber:string;
    role:UserRole;


}
