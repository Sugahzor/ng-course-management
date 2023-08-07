import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { UsersService } from '../core/shared/services/users.service';
import { AdminStateModel, GetAllUsers } from './admin.actions';

@State<AdminStateModel>({
  name: 'admin',
  defaults: {
    users: null,
    usersError: '',
  },
})
@Injectable()
export class AdminState {
  constructor(private usersService: UsersService) {}

  @Selector()
  static users(state: AdminStateModel) {
    return state.users;
  }

  @Selector()
  static usersError(state: AdminStateModel) {
    return state.usersError;
  }

  @Action(GetAllUsers)
  getAllUsers(ctx: StateContext<AdminStateModel>) {
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
}
