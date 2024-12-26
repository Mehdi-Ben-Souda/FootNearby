class User {
    constructor(
        id,
        name,
        email,
        role,
        image,
        phoneNumber, token) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.image = image;
        this.phoneNumber = phoneNumber;
        this.token = token;

    }


    // Exemple de méthode statique pour créer un utilisateur à partir d'un objet
    static fromJson(json) {
        return new User(
            json.user.id,
            json.user.name,
            json.user.email,
            json.user.role,
            json.user.image,
            json.user.phoneNumber,
            json.access_token
        );
    }
}

export default User;
