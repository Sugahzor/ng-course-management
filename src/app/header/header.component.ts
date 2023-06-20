import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LogoutUser } from '../redux/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private store: Store) {}

  logoutUser() {
    this.store.dispatch(new LogoutUser());
  }
}
