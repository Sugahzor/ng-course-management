import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';

import { SharedModule } from './core/shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/shared/services/auth.service';

import { appStates } from './redux/app.state';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserService } from './core/shared/services/user.service';
import { CoursesService } from './core/shared/services/courses.service';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CookieService } from 'ngx-cookie-service';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    CourseDetailsComponent,
    LessonsListComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    SharedModule,
    AppRoutingModule,
    NgxsModule.forRoot(appStates),
  ],
  providers: [AuthService, UserService, CoursesService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
