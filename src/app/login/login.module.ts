import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../core/shared/services/auth.service';
import { SharedModule } from '../core/shared/shared.module';
import { LoginComponent } from './login.component';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
  providers: [AuthService],
})
export class LoginModule {}
