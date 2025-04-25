import Role from "../utils/role.enum";
import { Model } from "./model";

export default class User extends Model {
    private _id: string;
    private _password: string;
    private _token?: string;
    private _role: Role;
    private _name: string; // Added name property

    constructor(obj: any);
    constructor(id: string,  name: string, password: string, role?: Role, token?: string);

    constructor(objOrId: any, name?: string, password?: string, role?: Role, token?: string) {        
        if (typeof objOrId === 'string') {
            super();
            this._id = objOrId;
            this._password = password!;
            this._token = token;
            this._role = role || Role.STUDENT;
            this._name = name || '';
        } else {
            super(objOrId._uuid);
            this._id = objOrId._id;
            this._password = objOrId._password;
            this._token = objOrId._token;
            this._role = objOrId._role;
            this._name = objOrId._name || '';
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

    get name(): string {
        return this._name;
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

    set name(name: string) {
        this._name = name;
    }

    get role() {
        return this._role;
    }

    hasRole(role: Role | Role[]) {
        const group = Array.isArray(role) ? role : [role];
        return group.includes(this._role);
    }
}