import User from "../models/user.model";

export default class userDto {
    private _id: string;

    constructor(user: User) {
        this._id = user.id;
    }

    get id() {
        return this._id;
    }
}