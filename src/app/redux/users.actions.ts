import {
  LoginData,
  UserEnrollInfo,
  UserDTO,
  UserEnroll,
} from '../core/shared/models/app.model';

export interface UsersStateModel {
  userResponse: UserDTO | null;
  loginError: string;
  logoutUser: boolean;
  userEnrollInfoResponse: UserEnrollInfo | null;
  checkEnrollmentError: string;
  userEnrollResponse: UserEnrollInfo | null;
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

export class CheckEnrollment {
  static readonly type = '[Users] Check Enrollment';
  constructor(public userEnroll: UserEnroll) {}
}

export class EnrollUser {
  static readonly type = '[Users] Enroll User';
  constructor(public userEnroll: UserEnroll) {}
}

export class ClearEnrollUserResponse {
  static readonly type = '[Users] Clear Enroll User Response';
  constructor() {}
}
