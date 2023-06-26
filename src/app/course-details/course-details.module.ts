import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesService } from '../core/shared/services/courses.service';
import { LessonsService } from '../core/shared/services/lessons.service';
import { SharedModule } from '../core/shared/shared.module';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { LessonsListComponent } from '../lessons-list/lessons-list.component';
import { CourseDetailsComponent } from './course-details.component';

const routes: Routes = [{ path: '', component: CourseDetailsComponent }];

@NgModule({
  declarations: [
    CourseDetailsComponent,
    LessonsListComponent,
    FileUploadComponent,
  ],
  imports: [RouterModule.forChild(routes), SharedModule],
  providers: [CoursesService, LessonsService],
})
export class CourseDetailsModule {}
