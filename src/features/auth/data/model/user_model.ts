import {User} from "../../domain/entity/user";

export class UserModel extends User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
    ) {
        super(id, name, email);
    }

    static fromJSON(json: any): UserModel {
        return new UserModel(json.$id, json.name, json.email);
    }

}