import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { CookieService } from 'ngx-cookie-service';
import { filter, Observable, takeUntil } from 'rxjs';
import { PROFESSOR, STUDENT } from '../core/constants.model';
import { BaseComponent } from '../core/shared/base/base.component';
import { CourseDTO, UserEnrollInfo } from '../core/shared/models/app.model';
import { GetCourses } from '../redux/courses.actions';
import { CoursesState } from '../redux/courses.state';
import {
  CheckEnrollment,
  ClearEnrollUserResponse,
  EnrollUser,
} from '../redux/users.actions';
import { UsersState } from '../redux/users.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent extends BaseComponent implements OnInit {
  courses: CourseDTO[];
  userEnrollInfoArray: UserEnrollInfo[] = [];
  @Select(CoursesState.coursesResponse) coursesResponse$: Observable<
    CourseDTO[]
  >;
  @Select(CoursesState.coursesError)
  coursesError$: Observable<string>;
  @Select(UsersState.userEnrollInfoResponse)
  userEnrollInfoResponse$: Observable<UserEnrollInfo>;
  @Select(UsersState.checkEnrollmentError)
  checkEnrollmentError$: Observable<string>;
  @Select(UsersState.userEnrollResponse)
  userEnrollResponse$: Observable<UserEnrollInfo>;
  @Select(UsersState.userEnrollError)
  userEnrollError$: Observable<string>;

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
    this.initUserEnrollInfoResponse();
    this.initUserEnrollResponse();
    this.initUserEnrollError();
    this.initCheckEnrollmentError();
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

  isUserEnrolled(courseId: number) {
    return this.userEnrollInfoArray.find(
      (userEnroll) => userEnroll.courseId === courseId
    )?.enrolled;
  }

  enrollUser(courseId: number) {
    this.store.dispatch(
      new EnrollUser({
        userId: parseInt(this.cookieService.get('userId')),
        courseId: courseId,
      })
    );
  }

  addNewCourse() {
    //TODO: WHY DOES THIS NAVIGATE TO COURSE DETAILS!!!!!
    this.router.navigate(['/new-course']);
  }

  private initCoursesResponse() {
    this.coursesResponse$
      .pipe(
        filter((value: any) => value?.length),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((coursesResponse) => {
        this.courses = [...coursesResponse];
        if (this.isUserStudent()) {
          this.courses.forEach((course) =>
            this.store.dispatch(
              new CheckEnrollment({
                userId: parseInt(this.cookieService.get('userId')),
                courseId: course.courseId,
              })
            )
          );
        }
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

  private initUserEnrollInfoResponse() {
    this.userEnrollInfoResponse$
      .pipe(
        filter((value: UserEnrollInfo | null) => value !== null),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((userEnrollInfoResponse) =>
        userEnrollInfoResponse
          ? this.userEnrollInfoArray.push(userEnrollInfoResponse)
          : ''
      );
  }

  private initCheckEnrollmentError() {
    this.checkEnrollmentError$
      .pipe(
        filter(
          (value: any) => value !== '' && value !== null && value !== undefined
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) =>
        console.error(error, 'Check User Enroll BE error response')
      );
  }

  private initUserEnrollResponse() {
    this.userEnrollResponse$
      .pipe(
        filter((value: any) => value !== null),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((response: UserEnrollInfo) => {
        this.store.dispatch(new ClearEnrollUserResponse());
        let previousUserEnrollment = this.userEnrollInfoArray.find(
          (userEnroll) => userEnroll.courseId === response.courseId
        );
        previousUserEnrollment
          ? (previousUserEnrollment.enrolled = response.enrolled)
          : '';
      });
  }

  private initUserEnrollError() {
    this.userEnrollError$
      .pipe(
        filter(
          (value: any) => value !== '' && value !== null && value !== undefined
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) =>
        console.error(error, 'User Enroll BE error response')
      );
  }
}
