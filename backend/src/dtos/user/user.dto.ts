import User from "../../models/user.model";
import Role from "../../utils/role.enum";

export default class userDto {
    uuid: string;
    id: string;
    role: Role;


    constructor(user: User) {
        this.uuid = user._uuid;
        this.id = user.id;
        this.role = user.role;
    }
}