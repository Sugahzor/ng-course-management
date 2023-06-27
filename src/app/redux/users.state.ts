import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserEnrollInfo, UserDTO } from '../core/shared/models/app.model';
import { UsersService } from '../core/shared/services/users.service';
import {
  UsersStateModel,
  LoginUser,
  LogoutUser,
  CheckEnrollment,
  EnrollUser,
  ClearEnrollUserResponse,
} from './users.actions';

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    userResponse: null,
    loginError: '',
    logoutUser: false,
    userEnrollInfoResponse: null,
    checkEnrollmentError: '',
    userEnrollResponse: null,
    userEnrollError: '',
  },
})
@Injectable()
export class UsersState {
  constructor(private usersService: UsersService) {}

  @Selector()
  static userResponse(state: UsersStateModel) {
    return state.userResponse;
  }

  @Selector()
  static loginError(state: UsersStateModel) {
    return state.loginError;
  }

  @Selector()
  static logoutUser(state: UsersStateModel) {
    return state.logoutUser;
  }

  @Selector()
  static userEnrollInfoResponse(state: UsersStateModel) {
    return state.userEnrollInfoResponse;
  }

  @Selector()
  static checkEnrollmentError(state: UsersStateModel) {
    return state.checkEnrollmentError;
  }

  @Selector()
  static userEnrollResponse(state: UsersStateModel) {
    return state.userEnrollResponse;
  }

  @Selector()
  static userEnrollError(state: UsersStateModel) {
    return state.userEnrollError;
  }

  @Action(LoginUser)
  loginUser(ctx: StateContext<UsersStateModel>, action: LoginUser) {
    return this.usersService.login(action.loginData).pipe(
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
          logoutUser: false,
        });
      })
    );
  }

  @Action(LogoutUser)
  logoutUser(ctx: StateContext<UsersStateModel>) {
    this.usersService.logout();
    ctx.patchState({
      logoutUser: true,
      userResponse: null,
      loginError: '',
    });
  }

  @Action(CheckEnrollment)
  checkEnrollment(ctx: StateContext<UsersStateModel>, action: CheckEnrollment) {
    return this.usersService.checkEnrollment(action.userEnroll).pipe(
      catchError((err: string) => {
        ctx.patchState({
          checkEnrollmentError: err,
        });
        throw throwError(() => new Error(err));
      }),
      tap((checkEnrollmentResponse: UserEnrollInfo) =>
        ctx.patchState({
          userEnrollInfoResponse: checkEnrollmentResponse,
        })
      )
    );
  }

  @Action(EnrollUser)
  enrollUser(ctx: StateContext<UsersStateModel>, action: EnrollUser) {
    return this.usersService.enrollUser(action.userEnroll).pipe(
      catchError((err: string) => {
        ctx.patchState({
          userEnrollError: err,
        });
        throw throwError(() => new Error(err));
      }),
      tap((response) =>
        ctx.patchState({
          userEnrollResponse: { ...response },
        })
      )
    );
  }
}
