import Class from "../../models/class.model";
import userDto from "../user/user.dto";

export class ClassDto {
    uuid: string;
    name: string;
    teacher: userDto;
    students: userDto[];
    grades?: { uuid: string; grade: number }[];

    constructor(classObj: Class) {
        this.uuid = classObj._uuid;
        this.name = classObj.name;
        this.teacher = new userDto(classObj.teacher);
        this.students = classObj.students?.map((s) => new userDto(s));
        this.grades = classObj.grades?.map((g) => ({
            uuid: g.uuid,
            grade: g.grade,
        }));
    }
}