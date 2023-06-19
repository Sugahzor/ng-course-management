import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../core/shared/base/base.component';
import { UserDTO } from '../core/shared/models/app.model';
import { LoginUser } from '../redux/login.actions';
import { LoginState } from '../redux/login.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent extends BaseComponent implements OnInit{
  loginForm: FormGroup;
  userResponse: UserDTO;

  @Select(LoginState.userResponse) userResponse$: Observable<UserDTO>;
  @Select(LoginState.loginError) loginError$: Observable<string>;

  constructor(private fb: FormBuilder, private store: Store) {
    super();
    this.loginForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl('')
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
      userPassword: this.loginForm.value.password.trim()
    };
    this.store.dispatch(new LoginUser(loginData));
    //Emit login user event
    // this.submitClicked.emit({ ...loginData });
  }

  private initAuthorizationResponse() {
    this.userResponse$
      .pipe(
        filter((value: any) => value!==null && value!== undefined)
      )
      .subscribe(userResponse => {
        this.userResponse = userResponse;
        console.log(userResponse, "response from BE");
      });
  }

  private initLoginErrorResponse() {
    this.loginError$
      .pipe(
        filter((value: any) => value!==null && value!== undefined),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(error => console.error(error, "BE error response"));
  }
}
