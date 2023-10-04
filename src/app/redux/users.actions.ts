import {
  UserEnrollInfoResponse,
  UserDTO,
  RegisterUserDTO,
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
  registerUser: UserDTO | null;
  registerUserError: string;
  deleteUser: boolean;
  deleteUserError: string;
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

export class RegisterUser {
  static readonly type = '[Users] Register User';
  constructor(public userInfo: RegisterUserDTO) {}
}

export class ClearRegisterUser {
  static readonly type = '[Users] Clear Register User';
  constructor() {}
}

export class DeleteUser {
  static readonly type = '[Admin] Delete User';
  constructor(public userId: number) {}
}

export class ClearDeleteUser {
  static readonly type = '[Admin] Clear Delete User';
}
