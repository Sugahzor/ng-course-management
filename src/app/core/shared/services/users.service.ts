import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { USERS_URL } from '../../constants.model';
import {
  LoginData,
  UserEnrollInfoResponse,
  UserDTO,
  UserEnroll,
} from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly ROOT_URL = environment.serviceUrlBase;
  private readonly FULL_USERS_URL = `${this.ROOT_URL}${USERS_URL}`;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(loginData: LoginData): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.FULL_USERS_URL}/login`, loginData);
  }

  logout() {
    this.cookieService.delete('userId');
    this.cookieService.delete('userRole');
  }

  enrollUser(userEnroll: UserEnroll): Observable<UserEnrollInfoResponse> {
    return this.http.post<UserEnrollInfoResponse>(
      `${this.FULL_USERS_URL}/enroll`,
      userEnroll
    );
  }

  disenrollUser(userEnroll: UserEnroll): Observable<UserEnrollInfoResponse> {
    return this.http.post<UserEnrollInfoResponse>(`${this.FULL_USERS_URL}/disenroll`, userEnroll);
  }

  getUserById(): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.FULL_USERS_URL}/${this.cookieService.get('userId')}`);
  }
}
