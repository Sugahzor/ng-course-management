import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { CookieService } from 'ngx-cookie-service';
import { filter, Observable, takeUntil } from 'rxjs';
import { PROFESSOR, STUDENT } from '../core/constants.model';
import { BaseComponent } from '../core/shared/base/base.component';
import { CourseDTO } from '../core/shared/models/app.model';
import { GetCourses } from '../redux/courses.actions';
import { CoursesState } from '../redux/courses.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent extends BaseComponent implements OnInit {
  courses: CourseDTO[];
  @Select(CoursesState.coursesResponse) coursesResponse$: Observable<
    CourseDTO[]
  >;
  @Select(CoursesState.coursesError)
  coursesError$: Observable<string>;

  constructor(
    private store: Store,
    private router: Router,
    private cookieService: CookieService
  ) {
    //TODO: persist data on refresh
    super();
    this.store.dispatch(new GetCourses());
  }

  override ngOnInit(): void {
    this.initCoursesResponse();
    this.initLoginErrorResponse();
  }

  goToDetails(courseId: number): void {
    this.router.navigate([`/course/${courseId}`]);
  }

  isUserProfessor() {
    return this.cookieService.get('userRole').toUpperCase() === PROFESSOR;
  }

  isUserStudent() {
    return this.cookieService.get('userRole').toUpperCase() === STUDENT;
  }

  isUserEnrolled() {
    //TODO: implement
    console.log('Need new service to check if user is enrolled?');
    return false;
  }

  enrollUser(courseId: number) {
    //TODO: implement
    console.log(
      'Implement enroll functionality for user: ',
      this.cookieService.get('userId')
    );
  }

  private initCoursesResponse() {
    this.coursesResponse$
      .pipe(
        filter((value: any) => value?.length),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((coursesResponse) => {
        this.courses = [...coursesResponse];
      });
  }

  private initLoginErrorResponse() {
    this.coursesError$
      .pipe(
        filter(
          (value: any) => value !== '' && value !== null && value !== undefined
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) => console.error(error, 'Course BE error response'));
  }
}
