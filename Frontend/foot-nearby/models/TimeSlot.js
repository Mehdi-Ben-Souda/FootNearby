class TimeSlot {
    constructor(id, startHour, date, status) {
        this.id = id;
        this.startHour = startHour;
        this.date = date;
        this.status = status;
    }

    static fromJson(json) {
        console.log("json: ", json);
        const data = json;
        return new TimeSlot(
            data.id,
            new Date(parseInt(data.startHour)),
            new Date(data.date),
            data.status
        );
    }

}

export default TimeSlot;