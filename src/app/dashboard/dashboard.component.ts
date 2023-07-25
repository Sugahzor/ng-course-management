import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { CookieService } from 'ngx-cookie-service';
import { filter, Observable, takeUntil } from 'rxjs';
import { PROFESSOR, STUDENT } from '../core/constants.model';
import { BaseComponent } from '../core/shared/base/base.component';
import {
  CourseDTO,
  UserDTO,
  UserEnrollInfoResponse,
} from '../core/shared/models/app.model';
import { GetCourses } from '../redux/courses.actions';
import { CoursesState } from '../redux/courses.state';
import { DisenrollUser, EnrollUser } from '../redux/users.actions';
import { UsersState } from '../redux/users.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent extends BaseComponent implements OnInit {
  courses: CourseDTO[];
  userData: UserDTO;
  @Select(CoursesState.coursesResponse) coursesResponse$: Observable<
    CourseDTO[]
  >;
  @Select(CoursesState.coursesError)
  coursesError$: Observable<string>;
  @Select(UsersState.userResponse)
  userResponse$: Observable<UserDTO>;
  @Select(UsersState.userEnrollResponse)
  userEnrollResponse$: Observable<UserEnrollInfoResponse>;
  @Select(UsersState.userEnrollError)
  userEnrollError$: Observable<string>;
  @Select(UsersState.userDisenrollResponse)
  userDisenrollResponse$: Observable<string>;
  @Select(UsersState.userDisenrollError)
  userDisenrollError$: Observable<string>;

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
    this.initUserResponse();
    this.initCoursesResponse();
    this.initLoginErrorResponse();
    this.initUserEnrollResponse();
    this.initUserEnrollError();
    this.initUserDisenrollResponse();
    this.initUserDisenrollError();
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

  isUserEnrolled(courseIdToCheck: number) {
    return this.userData.coursesEnrolledTo?.find(
      (courseId) => courseId === courseIdToCheck
    );
  }

  enrollUser(courseId: number) {
    this.store.dispatch(
      new EnrollUser({
        userId: parseInt(this.cookieService.get('userId')),
        courseId: courseId,
      })
    );
  }

  disenrollUser(courseId: number) {
    this.store.dispatch(
      new DisenrollUser({
        userId: this.userData.id as number,
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
      .subscribe((coursesResponse) => (this.courses = [...coursesResponse]));
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

  private initUserEnrollResponse() {
    this.userEnrollResponse$
      .pipe(
        filter((value: any) => value !== null),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((response: UserEnrollInfoResponse) =>
        this.userData?.coursesEnrolledTo.push(response.courseId)
      );
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

  private initUserResponse() {
    this.userResponse$
      .pipe(
        filter((value: any) => value !== null),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((userResponse) => (this.userData = { ...userResponse }));
  }

  private initUserDisenrollResponse() {
    this.userDisenrollResponse$
      .pipe(
        filter((value: any) => value !== null),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((response: UserEnrollInfoResponse) => {
        let disenrolledCourseIndex = this.userData?.coursesEnrolledTo.findIndex(
          (courseId) => courseId === response?.courseId
        );
        disenrolledCourseIndex > -1
          ? this.userData?.coursesEnrolledTo.splice(disenrolledCourseIndex, 1)
          : '';
      });
  }

  private initUserDisenrollError() {
    this.userDisenrollError$
      .pipe(
        filter(
          (value: any) => value !== '' && value !== null && value !== undefined
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) =>
        console.error(error, 'User Disenroll BE error response')
      );
  }
}
