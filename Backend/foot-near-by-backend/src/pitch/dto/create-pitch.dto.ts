import { Point } from "typeorm";

export class CreatePitchDto {
    name: string;
    description: string;
    address: string;
    location: Point;
    pricePerHour: number;
    capacity: number;
    images: string[];
    createdBy: number;
}