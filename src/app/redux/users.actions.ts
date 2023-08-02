import {
  UserEnrollInfoResponse,
  UserDTO,
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
  constructor(public courseId: number) {}
}

export class DisenrollUser {
  static readonly type = '[Users] Disenroll User';
  constructor(public courseId: number) {}
}

export class GetCurrentUser {
  static readonly type = '[Users] Get User By Id';
  constructor() {}
}
