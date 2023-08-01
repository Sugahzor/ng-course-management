import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { CookieService } from 'ngx-cookie-service';
import { filter, Observable, takeUntil } from 'rxjs';
import { BaseComponent } from '../core/shared/base/base.component';
import { LogoutUser } from '../redux/auth.actions';
import { AuthState } from '../redux/auth.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  isLoggedIn: boolean;
  @Select(AuthState.isLoggedIn) isLoggedIn$: Observable<boolean>;

  constructor(private store: Store, private router: Router) {
    super();
  }

  override ngOnInit(): void {
    this.initIsLoggedIn();
  }

  logoutUser() {
    this.store.dispatch(new LogoutUser());
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  private initIsLoggedIn() {
    this.isLoggedIn$
      .pipe(
        filter((value) => value !== null),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
        }
      });
  }
}
