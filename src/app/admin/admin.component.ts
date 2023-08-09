import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, Observable, takeUntil } from 'rxjs';
import { BaseComponent } from '../core/shared/base/base.component';
import { UserDTO } from '../core/shared/models/app.model';
import { GetAllUsers } from '../redux/admin.actions';
import { AdminState } from '../redux/admin.state';
import { UsersState } from '../redux/users.state';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent extends BaseComponent implements OnInit {
  adminUserInfo: UserDTO;
  users: UserDTO[];
  @Select(UsersState.userResponse) currentUser$: Observable<UserDTO>;
  @Select(UsersState.getUserError) getUserError$: Observable<string>;
  @Select(AdminState.users) users$: Observable<UserDTO[]>;
  @Select(AdminState.usersError) usersError$: Observable<string>;

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
        this.spinner.hide();
        this.users = [...usersResponse];
      });
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
}
