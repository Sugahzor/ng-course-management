import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { LogoutUser } from 'src/app/redux/auth.actions';
import { ClearCurrentUser } from 'src/app/redux/users.actions';
import { environment } from 'src/environments/environment';
import { AUTH_URL } from '../../constants.model';
import { LoginRequestPayload, LoginResponse } from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ROOT_URL = environment.serviceUrlBase;
  private readonly FULL_AUTH_URL = `${this.ROOT_URL}${AUTH_URL}`;

  constructor(private http: HttpClient, private store: Store) {}

  login(loginData: LoginRequestPayload): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.FULL_AUTH_URL}/login`, loginData)
      .pipe(tap((response) => this.setTimerForLogout(response.expiration)));
  }

  private setTimerForLogout(expiration: string) {
    const sessionMilliseconds =
      (new Date(expiration).getMinutes() - new Date(Date.now()).getMinutes()) *
      60 *
      1000;
    setTimeout(() => {
      //extra this in a helper file - DRY principle
      this.store.dispatch(new LogoutUser());
      this.store.dispatch(new ClearCurrentUser());
    }, sessionMilliseconds);
  }
}
