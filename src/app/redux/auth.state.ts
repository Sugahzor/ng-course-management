import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { LOGGED_IN, LOGGED_OUT } from '../core/constants.model';
import { LoginResponse } from '../core/shared/models/app.model';
import { AuthService } from '../core/shared/services/auth.service';
import { AuthStateModel, LoginUser, LogoutUser } from './auth.actions';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loginState: '',
    loginError: '',
  },
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {}

  @Selector()
  static loginState(state: AuthStateModel) {
    return state.loginState;
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
        localStorage.setItem(
          'accessToken',
          loginResponse.jwt?.toString() as string
        );
        localStorage.setItem('isLoggedIn', 'true');
        ctx.patchState({
          loginState: LOGGED_IN,
          loginError: '',
        });
      })
    );
  }

  @Action(LogoutUser)
  logoutUser(ctx: StateContext<AuthStateModel>) {
    localStorage.clear();
    ctx.patchState({
      loginState: LOGGED_OUT,
    });
  }
}
