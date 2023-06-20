import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../core/shared/base/base.component';
import { UserDTO } from '../core/shared/models/app.model';
import { UserService } from '../core/shared/services/user.service';
import { LoginUser } from '../redux/login.actions';
import { LoginState } from '../redux/login.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm: FormGroup;
  userResponse: UserDTO;

  @Select(LoginState.userResponse) userResponse$: Observable<UserDTO>;
  @Select(LoginState.loginError) loginError$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private userService: UserService
  ) {
    super();
    this.loginForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  override ngOnInit(): void {
    this.initAuthorizationResponse();
    this.initLoginErrorResponse();
  }

  onEnter(event: any) {
    event.preventDefault();
    if (this.loginForm.invalid) {
      return;
    }
    this.loginUser();
  }

  loginUser() {
    if (this.loginForm.get('email')?.pristine) {
      this.loginForm.get('email')?.setErrors({ required: true });
    }
    if (this.loginForm.get('password')?.pristine) {
      this.loginForm.get('password')?.setErrors({ required: true });
    }
    if (this.loginForm.invalid) {
      return;
    }
    let loginData = {
      userEmail: this.loginForm.value.email.trim(),
      userPassword: this.loginForm.value.password.trim(),
    };
    this.store.dispatch(new LoginUser(loginData));
  }

  private initAuthorizationResponse() {
    this.userResponse$
      .pipe(filter((value: any) => value !== null && value !== undefined))
      .subscribe((userResponse) => {
        this.userResponse = userResponse;
        this.userService.setUserResponse({ ...userResponse });
        this.router.navigate(['/dashboard']);
      });
  }

  private initLoginErrorResponse() {
    this.loginError$
      .pipe(
        filter((value: any) => value !== null && value !== undefined),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) => console.error(error, 'Login BE error response'));
  }
}
