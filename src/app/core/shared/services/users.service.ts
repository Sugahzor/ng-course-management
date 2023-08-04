import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { USERS_URL } from '../../constants.model';
import { UserEnrollInfoResponse, UserDTO } from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly ROOT_URL = environment.serviceUrlBase;
  private readonly FULL_USERS_URL = `${this.ROOT_URL}${USERS_URL}`;
  accessToken: string;

  constructor(private http: HttpClient) {}

  register() {
    //implement
  }

  enrollUser(courseId: number): Observable<UserEnrollInfoResponse> {
    return this.http.get<UserEnrollInfoResponse>(
      `${this.FULL_USERS_URL}/enroll/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
  }

  disenrollUser(courseId: number): Observable<UserEnrollInfoResponse> {
    return this.http.get<UserEnrollInfoResponse>(
      `${this.FULL_USERS_URL}/disenroll/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
  }

  getCurrentUser(): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.FULL_USERS_URL}/info`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  }
}
