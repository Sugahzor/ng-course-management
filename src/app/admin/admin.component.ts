import { Component, NgZone, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, Observable, takeUntil } from 'rxjs';
import { ADMIN, PROFESSOR, STUDENT, USER } from '../core/constants.model';
import { BaseComponent } from '../core/shared/base/base.component';
import { UserDTO } from '../core/shared/models/app.model';
import {
  DeleteUser,
  GetAllUsers,
  UpdateUserRole,
} from '../redux/users.actions';
import { UsersState } from '../redux/users.state';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from '../core/shared/custom/info-dialog/info-dialog.component';

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
  @Select(UsersState.deleteUserResponse)
  deleteUserResponse$: Observable<boolean>;
  @Select(UsersState.deleteUserError) deleteUserError$: Observable<string>;

  constructor(
    private store: Store,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private ngZone: NgZone
  ) {
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
    this.initDeleteUser();
    this.initDeleteUserError();
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

  onDeleteUser(user: UserDTO) {
    const dialogConfig = new MatDialogConfig();
    let data = {
      dialogTemplate: `Are you sure you want to delete the user ${user.userName}?`,
      showOkButton: true,
      onOkClicked: () => this.deleteUser(user.id),
    };
    dialogConfig.data = data;
    dialogConfig.width = '600px';
    dialogConfig.height = '300px';
    return this.ngZone.run(() =>
      this.dialog.open(InfoDialogComponent, dialogConfig)
    );
  }

  private deleteUser(userId: number) {
    userId ? this.store.dispatch(new DeleteUser(userId)) : '';
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

  private initDeleteUser() {
    this.deleteUserResponse$
      .pipe(
        filter((value: boolean) => value === true),
        takeUntil(this.unsubscribe$)
      )
      //use state not call here to refresh users list :
      .subscribe();
  }

  private initDeleteUserError() {
    this.deleteUserError$
      .pipe(
        filter(
          (value: any) => value !== '' && value !== null && value !== undefined
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) =>
        console.error(error, 'Delete user failed - BE error response')
      );
  }
}
