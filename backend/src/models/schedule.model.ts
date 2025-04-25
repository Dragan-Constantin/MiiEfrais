import Class from "./class.model";
import { Model } from "./model";

export default class Schedule extends Model {
    private _class: Class;
    private _startTime: Date;
    private _endTime: Date;
    private _location: string;

    constructor(obj: any);
    constructor(classObj: Class, startTime: Date, endTime: Date, location: string);
    constructor(objOrClass: any, startTime?: Date, endTime?: Date, location?: string) {
        if (objOrClass instanceof Class) {
            super();
            this._class = objOrClass;
            this._startTime = startTime!;
            this._endTime = endTime!;
            this._location = location!;
        } else {
            super(objOrClass._uuid);
            this._class = new Class(objOrClass._class);
            this._startTime = new Date(objOrClass._startTime);
            this._endTime = new Date(objOrClass._endTime);
            this._location = objOrClass._location;
        }
    }

    get class() {
        return this._class;
    }

    get startTime() {
        return this._startTime;
    }

    get endTime() {
        return this._endTime;
    }

    get location() {
        return this._location;
    }

}