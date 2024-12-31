class TimeSlot {
    constructor(id, startHour, date, status) {
        this.id = id;
        this.startHour = startHour;
        this.date = date;
        this.status = status;
    }

    static fromJson(json) {
        const data = JSON.parse(json);
        return new TimeSlot(
            data.id,
            new Date(parseInt(data.startHour)),
            new Date(data.date),
            data.status
        );
    }

}

export default TimeSlot;