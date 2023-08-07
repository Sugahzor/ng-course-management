import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, takeUntil } from 'rxjs';
import { LOGGED_OUT } from '../core/constants.model';
import { BaseComponent } from '../core/shared/base/base.component';
import { LogoutUser } from '../redux/auth.actions';
import { AuthState } from '../redux/auth.state';
import { ClearCurrentUser } from '../redux/users.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  @Select(AuthState.loginState) loginState$: Observable<string>;

  constructor(private store: Store, private router: Router) {
    super();
  }

  override ngOnInit(): void {
    this.initLoginState();
  }

  logoutUser() {
    this.store.dispatch(new LogoutUser());
    this.store.dispatch(new ClearCurrentUser());
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('isLoggedIn');
  }

  private initLoginState() {
    this.loginState$
      .pipe(
        filter((value) => value === LOGGED_OUT),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
