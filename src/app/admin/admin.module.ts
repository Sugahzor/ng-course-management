import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../core/shared/shared.module';

const routes: Routes = [{ path: '', component: AdminComponent }];
@NgModule({
  declarations: [AdminComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class AdminModule {}
