import { LoginData, UserDTO } from '../core/shared/models/app.model';

export interface AuthStateModel {
  userResponse: UserDTO | null;
  loginError: string;
  logoutUser: boolean;
}

export class LoginUser {
  static readonly type = '[Login Page] Login User';
  constructor(public loginData: LoginData) {}
}

export class LogoutUser {
  static readonly type = '[Logout User] Logout User';
  constructor() {}
}
