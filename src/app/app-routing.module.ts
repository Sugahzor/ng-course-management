import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'course/:id',
    loadChildren: () =>
      import('./course-details/course-details.module').then(
        (m) => m.CourseDetailsModule
      ),
  },
  {
    path: 'new-course',
    loadChildren: () =>
      import('./add-course/add-course.module').then((m) => m.AddCourseModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
