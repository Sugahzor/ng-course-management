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
  ClearCurrentUser,
  UpdateUserRole,
  GetAllUsers,
  RegisterUser,
  ClearRegisterUser,
} from './users.actions';

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: null,
    usersError: '',
    userResponse: null,
    getUserError: '',
    userEnrollResponse: null,
    userEnrollError: '',
    userDisenrollResponse: null,
    userDisenrollError: '',
    userUpdated: null,
    userUpdatedError: '',
    registerUser: null,
    registerUserError: '',
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
  static users(state: UsersStateModel) {
    return state.users;
  }

  @Selector()
  static usersError(state: UsersStateModel) {
    return state.usersError;
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

  @Selector()
  static userUpdated(state: UsersStateModel) {
    return state.userUpdated;
  }

  @Selector()
  static userUpdatedError(state: UsersStateModel) {
    return state.userUpdatedError;
  }

  @Selector()
  static registerUser(state: UsersStateModel) {
    return state.registerUser;
  }

  @Selector()
  static registerUserError(state: UsersStateModel) {
    return state.registerUserError;
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
        localStorage.setItem('userRole', userResponse.userRole.toUpperCase());
        ctx.patchState({
          userResponse: userResponse,
          getUserError: '',
        });
      })
    );
  }

  @Action(GetAllUsers)
  getAllUsers(ctx: StateContext<UsersStateModel>) {
    return this.usersService.getAllUsers().pipe(
      catchError((error) => {
        ctx.patchState({
          usersError: error,
        });
        throw throwError(() => new Error(error));
      }),
      tap((usersResponse) =>
        ctx.patchState({
          users: usersResponse,
          usersError: '',
        })
      )
    );
  }

  @Action(EnrollUser)
  enrollUser(ctx: StateContext<UsersStateModel>, action: EnrollUser) {
    return this.usersService.enrollUser(action.courseId).pipe(
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
    return this.usersService.disenrollUser(action.courseId).pipe(
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

  @Action(ClearCurrentUser)
  clearCurrentUser(ctx: StateContext<UsersStateModel>) {
    ctx.patchState({
      userResponse: null,
    });
  }

  @Action(UpdateUserRole)
  updateUserRole(ctx: StateContext<UsersStateModel>, action: UpdateUserRole) {
    return this.usersService.updateUserRole(action.userId, action.newRole).pipe(
      catchError((err: string) => {
        ctx.patchState({
          userUpdatedError: err,
        });
        throw throwError(() => new Error(err));
      }),
      tap((userUpdatedResponse) => {
        ctx.patchState({
          userUpdated: userUpdatedResponse,
          userUpdatedError: '',
          users: [
            ...this.updatedUsers(
              userUpdatedResponse,
              ctx.getState().users || []
            ),
          ],
        });
      })
    );
  }

  @Action(RegisterUser)
  registerUser(ctx: StateContext<UsersStateModel>, action: RegisterUser) {
    return this.usersService.register(action.userInfo).pipe(
      catchError((error: string) => {
        ctx.patchState({
          registerUserError: error,
        });
        throw throwError(() => new Error(error));
      }),
      tap((response) =>
        ctx.patchState({
          registerUser: response,
          registerUserError: '',
        })
      )
    );
  }

  @Action(ClearRegisterUser)
  clearRegisterUser(ctx: StateContext<UsersStateModel>) {
    ctx.patchState({
      registerUser: null,
    });
  }

  private updatedUsers(response: UserDTO, currentUsers: UserDTO[]): UserDTO[] {
    let userToUpdateIndex = currentUsers?.findIndex(
      (user) => user.id === response.id
    );
    userToUpdateIndex && currentUsers?.length
      ? (currentUsers[userToUpdateIndex] = { ...response })
      : '';
    return currentUsers;
  }
}
