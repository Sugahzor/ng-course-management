import { LoginRequestPayload } from '../core/shared/models/app.model';

export interface AuthStateModel {
  loginState: string;
  loginError: string;
}

export class LoginUser {
  static readonly type = '[Auths] Login User';
  constructor(public loginData: LoginRequestPayload) {}
}

export class LogoutUser {
  static readonly type = '[Logout User] Logout User';
  constructor() {}
}
