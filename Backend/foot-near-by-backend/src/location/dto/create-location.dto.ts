export class CreateLocationDto {
    latitude: number;
    longitude: number;

    constructor(location: Partial<CreateLocationDto>) {
        Object.assign(this, location);
    }
}
