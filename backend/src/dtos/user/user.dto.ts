import User from "../../models/user.model";

export default class userDto {
    private id: string;

    constructor(user: User) {
        this.id = user.id;
    }
}