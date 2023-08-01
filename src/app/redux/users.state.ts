import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserDTO } from '../core/shared/models/app.model';
import { UsersService } from '../core/shared/services/users.service';
import {
  UsersStateModel,
  EnrollUser,
  DisenrollUser,
  GetCurrentUser,
} from './users.actions';

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    userResponse: null,
    getUserError: '',
    userEnrollResponse: null,
    userEnrollError: '',
    userDisenrollResponse: null,
    userDisenrollError: '',
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
  static getUserError(state: UsersStateModel) {
    return state.getUserError;
  }

  @Selector()
  static userEnrollResponse(state: UsersStateModel) {
    return state.userEnrollResponse;
  }

  @Selector()
  static userEnrollError(state: UsersStateModel) {
    return state.userEnrollError;
  }

  @Selector()
  static userDisenrollResponse(state: UsersStateModel) {
    return state.userDisenrollResponse;
  }

  @Selector()
  static userDisenrollError(state: UsersStateModel) {
    return state.userDisenrollError;
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

  @Action(DisenrollUser)
  disenrollUser(ctx: StateContext<UsersStateModel>, action: DisenrollUser) {
    return this.usersService.disenrollUser(action.userEnroll).pipe(
      catchError((err: string) => {
        ctx.patchState({
          userDisenrollError: err,
        });
        throw throwError(() => new Error(err));
      }),
      tap((response) =>
        ctx.patchState({
          userDisenrollResponse: { ...response },
        })
      )
    );
  }

  @Action(GetCurrentUser)
  getCurrentUser(ctx: StateContext<UsersStateModel>, action: GetCurrentUser) {
    return this.usersService.getCurrentUser().pipe(
      catchError((err: string) => {
        ctx.patchState({
          getUserError: err,
        });
        throw throwError(() => new Error(err));
      }),
      tap((userResponse: UserDTO) => {
        ctx.patchState({
          userResponse: userResponse,
        });
      })
    );
  }
}
