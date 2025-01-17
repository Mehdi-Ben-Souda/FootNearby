class Pitch {
    constructor(id, name, description, address, capacity, longitude, latitude, pricePerHour, images) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.address = address;
        this.capacity = capacity;
        this.longitude = longitude;
        this.latitude = latitude;
        this.pricePerHour = pricePerHour;
        this.images = images;
    }

    static fromJsonSearch(json) {
        const data = json;
        return new Pitch(
            data.pitch_id,
            data.pitch_name,
            data.pitch_description,
            data.pitch_address,
            data.pitch_capacity,
            data.pitch_location.coordinates[0],
            data.pitch_location.coordinates[1],
            data.pitch_pricePerHour,
            data.pitch_images
        );
    }


}

export default Pitch;