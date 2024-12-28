import { SlotStatus } from "src/enums";
import { TimeSlot } from "./time-slot.entity";

export class Day {

    private slots: TimeSlot[] = [];

    constructor(
        public readonly date: Date
    ) {}

    /*updateSlots(slots: TimeSlot[]) {
        this.slots = slots.sort((a, b) => 
            compareAsc(a.startHour, b.startHour)
        );
    }*/

    getSlots(): TimeSlot[] {
        return [...this.slots];
    }

    getAvailableSlots(): TimeSlot[] {
        return this.slots.filter(slot => slot.status === SlotStatus.FREE);
    }
    
}
/*function compareAsc(startHour: string, startHour1: string): number {
    const [hourA, minuteA] = startHour.split(':').map(Number);
    const [hourB, minuteB] = startHour1.split(':').map(Number);

    if (hourA !== hourB) {
        return hourA - hourB;
    }
    return minuteA - minuteB;
}*/

