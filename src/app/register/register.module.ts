import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersService } from '../core/shared/services/users.service';
import { SharedModule } from '../core/shared/shared.module';
import { RegisterComponent } from './register.component';

const routes: Routes = [{ path: '', component: RegisterComponent }];

@NgModule({
  declarations: [RegisterComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
  providers: [UsersService],
})
export class RegisterModule {}
