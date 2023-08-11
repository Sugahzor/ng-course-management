import {
  UserEnrollInfoResponse,
  UserDTO,
} from '../core/shared/models/app.model';

export interface UsersStateModel {
  users: UserDTO[] | null;
  usersError: string;
  userResponse: UserDTO | null;
  getUserError: string;
  userEnrollResponse: UserEnrollInfoResponse | null;
  userEnrollError: string;
  userDisenrollResponse: UserEnrollInfoResponse | null;
  userDisenrollError: string;
  userUpdated: UserDTO | null;
  userUpdatedError: string;
}

export class GetAllUsers {
  static readonly type = '[Admin] Get All Users';
  constructor() {}
}

export class GetCurrentUser {
  static readonly type = '[Users] Get User By Id';
  constructor() {}
}

export class EnrollUser {
  static readonly type = '[Users] Enroll User';
  constructor(public courseId: number) {}
}

export class DisenrollUser {
  static readonly type = '[Users] Disenroll User';
  constructor(public courseId: number) {}
}

export class ClearCurrentUser {
  static readonly type = '[Users] Clear Current User Data';
  constructor() {}
}

export class UpdateUserRole {
  static readonly type = '[Admin] Change User Role';
  constructor(public userId: number, public newRole: string) {}
}
