import {
  LoginData,
  UserEnrollInfoResponse,
  UserDTO,
  UserEnroll,
} from '../core/shared/models/app.model';

export interface UsersStateModel {
  userResponse: UserDTO | null;
  loginError: string;
  logoutUser: boolean;
  userEnrollInfoResponse: UserEnrollInfoResponse | null;
  userEnrollResponse: UserEnrollInfoResponse | null;
  userEnrollError: string;
  userDisenrollResponse: UserEnrollInfoResponse | null;
  userDisenrollError: string;
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

export class DisenrollUser {
  static readonly type = '[Users] Disenroll User';
  constructor(public userEnroll: UserEnroll) {}
}
