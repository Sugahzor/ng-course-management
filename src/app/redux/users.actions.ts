import {
  LoginData,
  UserEnrollResponse,
  UserDTO,
  UserEnroll,
} from '../core/shared/models/app.model';

export interface UsersStateModel {
  userResponse: UserDTO | null;
  loginError: string;
  logoutUser: boolean;
  userEnrollInfoResponse: UserEnrollResponse | null;
  userEnrollResponse: UserEnrollResponse | null;
  userEnrollError: string;
}

export class LoginUser {
  static readonly type = '[Login Page] Login User';
  constructor(public loginData: LoginData) {}
}

export class LogoutUser {
  static readonly type = '[Logout User] Logout User';
  constructor() {}
}

export class EnrollUser {
  static readonly type = '[Users] Enroll User';
  constructor(public userEnroll: UserEnroll) {}
}
