import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../core/shared/shared.module';
import { AddCourseComponent } from './add-course.component';

const routes: Routes = [{ path: '', component: AddCourseComponent }];

@NgModule({
  declarations: [AddCourseComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class AddCourseModule {}
