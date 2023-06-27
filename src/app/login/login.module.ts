import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersService } from '../core/shared/services/users.service';
import { SharedModule } from '../core/shared/shared.module';
import { LoginComponent } from './login.component';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
  providers: [UsersService],
})
export class LoginModule {}
