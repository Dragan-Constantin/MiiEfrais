import { Model } from "./model";
import User from "./user.model";



export default class Class extends Model {

    private _name: string;
    private _students: User[];
    private _teacher: User;

    constructor(obj: any);
    constructor(name: string, teacher: User, students: User[]);

    constructor(objOrName: any, teacher?: User, students?: User[]) {
        if (typeof objOrName === 'string') {
            super();
            this._name = objOrName;
            this._students = students || [];
            this._teacher = teacher!;
        } else {
            super();
            this._name = objOrName._name;
            this._students = objOrName._students;
            this._uuid = objOrName._uuid;
            this._teacher = objOrName._teacher;
        }
    }

    get name() {
        return this._name;
    }

    get students() {
        return this._students;
    }

    get teacher() {
        return this._teacher;
    }

    set name(name: string) {
        this._name = name;
    }

    addStudent(student: User) {
        if (!this._students.some((s) => s.id === student.id)) {
            this._students.push(student);
        }
    }

    removeStudent(student: User) {
        this._students = this._students.filter((s) => s.id !== student.id);
    }
}