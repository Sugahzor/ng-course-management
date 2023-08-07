import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, takeUntil } from 'rxjs';
import { BaseComponent } from '../core/shared/base/base.component';
import { UserDTO } from '../core/shared/models/app.model';
import { UsersState } from '../redux/users.state';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent extends BaseComponent implements OnInit {
  adminUserInfo: UserDTO;
  @Select(UsersState.userResponse) currentUser$: Observable<UserDTO>;
  @Select(UsersState.getUserError) getUserError$: Observable<string>;

  constructor(private store: Store) {
    super();
  }

  override ngOnInit(): void {
    // this.store.dispatch(new GetUsers());
    this.initCurrentUser();
    this.initGetUserError();
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
}
