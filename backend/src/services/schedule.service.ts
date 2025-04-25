import Class from "../models/class.model";
import Schedule from "../models/schedule.model";
import database from "../utils/database";


class ScheduleService {
    

    create(classObj: Class, startTime: Date, endTime: Date, location: string): Schedule {
        const schedule = new Schedule(classObj, startTime, endTime, location);

        database.insert('schedules', schedule);
        return schedule;
    }

    getAll(): Schedule[] {
        const schedules = database.select('schedules');

        return schedules.map((schedule: any) => {
            return new Schedule(schedule);
        });
    }

    getByUuid(uuid: string): Schedule | undefined {
        const schedules = this.getAll();
        return schedules.find(schedule => schedule._uuid === uuid);
    }

    getByClass(classObj: Class): Schedule[] {
        const schedules = this.getAll();
        return schedules.filter(schedule => schedule.class._uuid === classObj._uuid);
    }

    delete(schedule: Schedule): void {
        const schedules = this.getAll();

        const scheduleIndex = schedules.findIndex(s => s._uuid === schedule._uuid);
        schedules.splice(scheduleIndex, 1);
        database.update('schedules', schedules);
    }
}

const scheduleService = new ScheduleService();
export default scheduleService;