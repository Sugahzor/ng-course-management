import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CookieService } from 'ngx-cookie-service';
import { LogoutUser } from '../redux/users.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private store: Store,
    private router: Router,
    private cookieService: CookieService
  ) {}

  logoutUser() {
    this.store.dispatch(new LogoutUser());
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.get('userId');
  }
}
