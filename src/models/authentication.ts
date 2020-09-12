import {User} from "./user";

export class AuthenticationRequest {
    public username: string = '';
    public password: string = '';
}

export class AuthenticationResponse extends User {
    public token: string = '';
}
