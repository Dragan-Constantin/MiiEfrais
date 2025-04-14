import Role from "../utils/role.enum";
import { Model } from "./model";



export default class User extends Model {
    private _id: string;
    private _password: string;
    private _token?: string;
    private _role: Role;


    constructor(obj: any);
    constructor(id: string, password: string, _role?: Role, token?: string);

    constructor(objOrId: any, password?: string, role?: Role, token?: string) {
        super();
        
        if (typeof objOrId === 'string') {
            this._id = objOrId;
            this._password = password!;
            this._token = token;
            this._role = role || Role.STUDENT;
        } else {
            this._id = objOrId._id;
            this._password = objOrId._password;
            this._uuid = objOrId._uuid;
            this._token = objOrId._token;
            this._role = objOrId._role;
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

    set role(role: Role) {
        this._role = role;
    }
    get role() {
        return this._role;
    }

    hasRole(role: Role | Role[]) {
        const group = Array.isArray(role) ? role : [role];
        return group.includes(this._role);
    }
}   