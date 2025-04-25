import Schedule from "../../models/schedule.model";
import { ClassDto } from "../class/class.dto";

export class ScheduleDto {
    uuid: string;
    class: ClassDto;
    startTime: number;
    endTime: number;
    location: string;


    constructor(schedule: Schedule) {
        this.uuid = schedule._uuid;
        this.class = new ClassDto(schedule.class);
        this.startTime = schedule.startTime.getTime();
        this.endTime = schedule.endTime.getTime();
        this.location = schedule.location;
    }
}