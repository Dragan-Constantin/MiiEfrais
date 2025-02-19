import { Model } from "./model";



export default class User extends Model {
    private _id: string;
    private _password: string;


    constructor(obj: any);
    constructor(id: string, password: string);

    constructor(objOrId: any, password?: string) {
        super();
        
        if (typeof objOrId === 'string') {
            this._id = objOrId;
            this._password = password!;
        } else {
            this._id = objOrId._id;
            this._password = objOrId._password;
            this._uuid = objOrId._uuid;
        }
    }
    
    get password() {
        return this._password;
    }

    get id() {
        return this._id;
    }

    set password(password: string) {
        this._password = password;
    }
}   