
export class CreateUserDto {
    constructor(email: string, password: string, username: string) {
        this.email = email;
        this.password = password;
        this.username = username;
    }

    email: string;

    password: string;

    username: string;

}
