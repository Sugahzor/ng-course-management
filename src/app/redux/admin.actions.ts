import { UserDTO } from '../core/shared/models/app.model';

export interface AdminStateModel {
  users: UserDTO[] | null;
  usersError: string;
}

export class GetAllUsers {
  static readonly type = '[Admin] Get All Users';
  constructor() {}
}
