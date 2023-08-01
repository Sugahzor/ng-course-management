import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AUTH_URL } from '../../constants.model';
import { LoginRequestPayload, LoginResponse } from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ROOT_URL = environment.serviceUrlBase;
  private readonly FULL_AUTH_URL = `${this.ROOT_URL}${AUTH_URL}`;

  constructor(private http: HttpClient) {}

  login(loginData: LoginRequestPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.FULL_AUTH_URL}/login`,
      loginData
    );
  }
}
