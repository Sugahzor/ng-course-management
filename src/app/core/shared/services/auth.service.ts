import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { USERS_URL } from '../../constants.model';
import { LoginData, UserDTO } from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ROOT_URL = environment.serviceUrlBase;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(loginData: LoginData): Observable<UserDTO> {
    return this.http.post<UserDTO>(
      `${this.ROOT_URL}${USERS_URL}/login`,
      loginData
    );
  }

  logout() {
    this.cookieService.delete('userId');
    this.cookieService.delete('userRole');
  }
}
