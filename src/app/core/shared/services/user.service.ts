import { Injectable } from '@angular/core';
import { UserDTO } from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: UserDTO | null = null;

  constructor() {}

  setUserResponse(userResponse: UserDTO): void {
    this.userData = userResponse;
  }

  getUserResponse(): UserDTO {
    return this.userData
      ? this.userData
      : {
          id: null,
          userName: '',
          userEmail: '',
          userRole: '',
        };
  }
}
