import User from "../../models/user.model";
import Role from "../../utils/role.enum";

export default class userDto {
    uuid: string;
    name: string;
    id: string;
    role: Role;


    constructor(user: User) {
        this.uuid = user._uuid;
        this.name = user.name;
        this.id = user.id;
        this.role = user.role;
    }
}