import {
  UserEnrollInfoResponse,
  UserDTO,
  UserEnroll,
} from '../core/shared/models/app.model';

export interface UsersStateModel {
  userResponse: UserDTO | null;
  getUserError: string;
  userEnrollResponse: UserEnrollInfoResponse | null;
  userEnrollError: string;
  userDisenrollResponse: UserEnrollInfoResponse | null;
  userDisenrollError: string;
}

export class EnrollUser {
  static readonly type = '[Users] Enroll User';
  constructor(public userEnroll: UserEnroll) {}
}

export class DisenrollUser {
  static readonly type = '[Users] Disenroll User';
  constructor(public userEnroll: UserEnroll) {}
}

export class GetCurrentUser {
  static readonly type = '[Users] Get User By Id';
  constructor() {}
}
