import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserDTO } from '../core/shared/models/app.model';
import { AuthService } from '../core/shared/services/auth.service';
import { AuthStateModel, LoginUser, LogoutUser } from './auth.actions';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    userResponse: null,
    loginError: '',
    logoutUser: false,
  },
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {}

  @Selector()
  static userResponse(state: AuthStateModel) {
    return state.userResponse;
  }

  @Selector()
  static loginError(state: AuthStateModel) {
    return state.loginError;
  }

  @Selector()
  static logoutUser(state: AuthStateModel) {
    return state.logoutUser;
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
      tap((userResponse: UserDTO) => {
        ctx.patchState({
          userResponse: userResponse,
          loginError: '',
          logoutUser: false
        });
      })
    );
  }

  @Action(LogoutUser)
  logoutUser(ctx: StateContext<AuthStateModel>) {
    this.authService.logout();
    ctx.patchState({
      logoutUser: true,
      userResponse: null,
      loginError: ''
    });
  }
}
