import { Model } from "./model";



export default class User extends Model {
    private _id: string;
    private _password: string;
    private _token?: string;


    constructor(obj: any);
    constructor(id: string, password: string, token?: string);

    constructor(objOrId: any, password?: string, token?: string) {
        super();
        
        if (typeof objOrId === 'string') {
            this._id = objOrId;
            this._password = password!;
            this._token = token;
        } else {
            this._id = objOrId._id;
            this._password = objOrId._password;
            this._uuid = objOrId._uuid;
            this._token = objOrId._token;
        }
    }
    
    get password() {
        return this._password;
    }

    get id() {
        return this._id;
    }

    get token(): string | undefined {
        return this._token;
    }

    set password(password: string) {
        this._password = password;
    }

    set token(token: string) {
        this._token = token;
    }
}   