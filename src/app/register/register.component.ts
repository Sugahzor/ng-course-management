import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, takeUntil } from 'rxjs';
import { BaseComponent } from '../core/shared/base/base.component';
import { MyErrorStateMatcher } from '../core/shared/custom/myErrorStateMatcher';
import { RegisterUserDTO, UserDTO } from '../core/shared/models/app.model';
import { RegisterUser } from '../redux/users.actions';
import { UsersState } from '../redux/users.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent implements OnInit {
  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  nameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);

  @Select(UsersState.registerUser) registerUser$: Observable<UserDTO>;
  @Select(UsersState.registerUserError) registerUserError$: Observable<string>;

  constructor(private router: Router, private store: Store) {
    super();
  }

  override ngOnInit(): void {
    this.initRegisterUser();
    this.initRegisterUserError();
  }

  registerUser() {
    let payload: RegisterUserDTO;
    if (
      this.nameFormControl.value &&
      this.emailFormControl.value &&
      this.passwordFormControl.value
    ) {
      payload = {
        userName: this.nameFormControl.value,
        userEmail: this.emailFormControl.value,
        userPassword: this.passwordFormControl.value,
      };
      this.store.dispatch(new RegisterUser(payload));
    } else {
      // TODO: handle validations
    }
  }

  private initRegisterUser() {
    this.registerUser$
      .pipe(
        filter((value) => !!value),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((response) => this.router.navigate(['/dashboard']));
  }

  private initRegisterUserError() {
    this.registerUserError$
      .pipe(
        filter(
          (value: any) => value !== '' && value !== null && value !== undefined
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) =>
        console.error(error, 'Register User BE error response')
      );
  }
}
