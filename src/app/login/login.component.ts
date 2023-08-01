import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { EN_LANG } from '../core/constants.model';
import { BaseComponent } from '../core/shared/base/base.component';
import { UserDTO } from '../core/shared/models/app.model';
import { LoginUser } from '../redux/auth.actions';
import { AuthState } from '../redux/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm: FormGroup;
  userResponse: UserDTO;

  @Select(AuthState.isLoggedIn) isLoggedIn$: Observable<boolean>;
  @Select(AuthState.loginError) loginError$: Observable<string>;

  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    super();
    this.translate.setDefaultLang(EN_LANG);
    this.loginForm = this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  override ngOnInit(): void {
    this.initIsLoggedIn();
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
    if (this.loginForm.get('username')?.pristine) {
      this.loginForm.get('username')?.setErrors({ required: true });
    }
    if (this.loginForm.get('password')?.pristine) {
      this.loginForm.get('password')?.setErrors({ required: true });
    }
    if (this.loginForm.invalid) {
      return;
    }
    let loginData = {
      userName: this.loginForm.value.username.trim(),
      userPassword: this.loginForm.value.password.trim(),
    };
    this.store.dispatch(new LoginUser(loginData));
  }

  private initIsLoggedIn() {
    this.isLoggedIn$
      .pipe(filter((value: any) => value))
      .subscribe(() => this.router.navigate(['/dashboard']));
  }

  private initLoginErrorResponse() {
    this.loginError$
      .pipe(
        filter(
          (value: any) => value !== '' && value !== null && value !== undefined
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) => console.error(error, 'Login BE error response'));
  }
}
