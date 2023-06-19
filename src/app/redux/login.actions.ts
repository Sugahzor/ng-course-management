import { LoginData, UserDTO } from "../core/shared/models/app.model";

export interface LoginStateModel {
    userResponse: UserDTO;
    loginError: string;
}

export class LoginUser {
    static readonly type = '[Login Page] Login User'
    constructor(public loginData: LoginData) {}
}