import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ACCESS_TOKEN, USERS_URL } from '../../constants.model';
import { UserEnrollInfoResponse, UserDTO } from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly ROOT_URL = environment.serviceUrlBase;
  private readonly FULL_USERS_URL = `${this.ROOT_URL}${USERS_URL}`;

  constructor(private http: HttpClient) {}

  register() {
    //implement
  }

  getCurrentUser(): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.FULL_USERS_URL}/info`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    });
  }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.FULL_USERS_URL}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    });
  }

  enrollUser(courseId: number): Observable<UserEnrollInfoResponse> {
    return this.http.get<UserEnrollInfoResponse>(
      `${this.FULL_USERS_URL}/enroll/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      }
    );
  }

  disenrollUser(courseId: number): Observable<UserEnrollInfoResponse> {
    return this.http.get<UserEnrollInfoResponse>(
      `${this.FULL_USERS_URL}/disenroll/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      }
    );
  }

  updateUserRole(userId: number, newRole: string): Observable<UserDTO> {
    return this.http.put<UserDTO>(
      `${this.FULL_USERS_URL}/change/role`,
      { userId, newRole },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      }
    );
  }
}
