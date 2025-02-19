import User from "../../models/user.model";
import userDto from "./user.dto";


export default class credsDto extends userDto {
    private password: string;

    constructor(user: User) {
        super(user);
        this.password = user.password;
    }
}