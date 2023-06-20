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
import { LoginService } from './core/shared/services/login.service';

import { appStates } from './redux/app.state';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserService } from './core/shared/services/user.service';
import { CoursesService } from './core/shared/services/courses.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    SharedModule,
    AppRoutingModule,
    NgxsModule.forRoot(appStates),
  ],
  providers: [LoginService, UserService, CoursesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
