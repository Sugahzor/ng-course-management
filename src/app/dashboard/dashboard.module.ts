import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../core/shared/shared.module';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent }];
@NgModule({
  declarations: [DashboardComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class DashboardModule {}
