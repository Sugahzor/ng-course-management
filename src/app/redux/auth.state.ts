import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CookieService } from 'ngx-cookie-service';
import { catchError, tap, throwError } from 'rxjs';
import { LoginResponse } from '../core/shared/models/app.model';
import { AuthService } from '../core/shared/services/auth.service';
import { AuthStateModel, LoginUser, LogoutUser } from './auth.actions';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    isLoggedIn: null,
    loginError: '',
  },
})
@Injectable()
export class AuthState {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  @Selector()
  static isLoggedIn(state: AuthStateModel) {
    return state.isLoggedIn;
  }

  @Selector()
  static loginError(state: AuthStateModel) {
    return state.loginError;
  }

  @Action(LoginUser)
  loginUser(ctx: StateContext<AuthStateModel>, action: LoginUser) {
    return this.authService.login(action.loginData).pipe(
      catchError((err: string) => {
        ctx.patchState({
          loginError: err,
        });
        throw throwError(() => new Error(err));
      }),
      tap((loginResponse: LoginResponse) => {
        this.cookieService.set(
          'accessToken',
          loginResponse.jwt?.toString() as string
        );
        this.cookieService.set(
            'isLoggedIn',
            'true'
        )
        ctx.patchState({
          isLoggedIn: true,
          loginError: '',
        });
      })
    );
  }

  @Action(LogoutUser)
  logoutUser(ctx: StateContext<AuthStateModel>) {
    this.cookieService.delete('accessToken');
    this.cookieService.delete('userRole');
    this.cookieService.delete('isLoggedIn');
    ctx.patchState({
      isLoggedIn: false,
    });
  }
}
