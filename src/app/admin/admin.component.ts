import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, Observable, takeUntil } from 'rxjs';
import { ADMIN, PROFESSOR, STUDENT, USER } from '../core/constants.model';
import { BaseComponent } from '../core/shared/base/base.component';
import { UserDTO } from '../core/shared/models/app.model';
import { GetAllUsers, UpdateUserRole } from '../redux/users.actions';
import { UsersState } from '../redux/users.state';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent extends BaseComponent implements OnInit {
  adminUserInfo: UserDTO;
  users: UserDTO[];
  panelOpenState: Map<number, boolean>;
  selectedRole: Map<number, string>;
  USER_ROLES = [ADMIN, PROFESSOR, STUDENT, USER];

  @Select(UsersState.userResponse) currentUser$: Observable<UserDTO>;
  @Select(UsersState.getUserError) getUserError$: Observable<string>;
  @Select(UsersState.users) users$: Observable<UserDTO[]>;
  @Select(UsersState.usersError) usersError$: Observable<string>;
  @Select(UsersState.userUpdated) userUpdated$: Observable<UserDTO>;
  @Select(UsersState.userUpdatedError) userUpdatedError$: Observable<string>;

  constructor(private store: Store, private spinner: NgxSpinnerService) {
    super();
  }

  override ngOnInit(): void {
    this.spinner.show();
    this.store.dispatch(new GetAllUsers());
    this.initCurrentUser();
    this.initGetUserError();
    this.initUsers();
    this.initUsersError();
    this.initUserUpdated();
    this.initUserUpdateError();
  }

  getAvailableRoles(currentRole: string): string[] {
    return this.USER_ROLES.filter((role) => role !== currentRole.toUpperCase());
  }

  onRoleSelected(event: any, userId: number) {
    this.selectedRole.set(userId, event.value);
  }

  updateUserRole(userId: number | null) {
    userId && this.selectedRole.get(userId)
      ? this.store.dispatch(
          new UpdateUserRole(userId, this.selectedRole.get(userId) as string)
        )
      : '';
  }

  private initCurrentUser() {
    this.currentUser$
      .pipe(
        filter((value: any) => value !== null),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        (currentUserResponse: UserDTO) =>
          (this.adminUserInfo = { ...currentUserResponse })
      );
  }

  private initGetUserError() {
    this.getUserError$
      .pipe(
        filter(
          (value: any) => value !== '' && value !== null && value !== undefined
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) =>
        console.error(error, 'Get User By Id BE error response')
      );
  }

  private initUsers() {
    this.users$
      .pipe(
        filter((value) => !!value),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((usersResponse) => {
        this.selectedRole = new Map();
        this.panelOpenState = new Map();
        this.spinner.hide();
        this.users = [...usersResponse];
        this.users.forEach((user) =>
          user.id || user.id === 0 ? this.initMaps(user) : ''
        );
      });
  }

  private initMaps(user: UserDTO) {
    this.selectedRole.set(user.id, user.userRole);
    this.panelOpenState.set(user.id, false);
  }

  private initUsersError() {
    this.usersError$
      .pipe(
        filter(
          (value: any) => value !== '' && value !== null && value !== undefined
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) =>
        console.error(error, 'Get Users BE error response')
      );
  }

  private initUserUpdated() {
    this.userUpdated$
      .pipe(
        filter((value) => !!value),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  private initUserUpdateError() {
    this.userUpdatedError$
      .pipe(
        filter(
          (value: any) => value !== '' && value !== null && value !== undefined
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) =>
        console.error(error, 'Update user failed - BE error response')
      );
  }
}
