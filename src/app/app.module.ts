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

import { appStates } from './redux/app.state';
import { CookieService } from 'ngx-cookie-service';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CourseDetailsModule } from './course-details/course-details.module';
import { AddCourseModule } from './add-course/add-course.module';

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    SharedModule,
    LoginModule,
    DashboardModule,
    CourseDetailsModule,
    AddCourseModule,
    AppRoutingModule,
    NgxsModule.forRoot(appStates),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
