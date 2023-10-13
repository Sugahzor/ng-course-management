import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, Observable, takeUntil } from 'rxjs';
import { ADMIN, PROFESSOR, STUDENT } from '../core/constants.model';
import { BaseComponent } from '../core/shared/base/base.component';
import {
  CourseDTO,
  UserDTO,
  UserEnrollInfoResponse,
} from '../core/shared/models/app.model';
import { GetCourses } from '../redux/courses.actions';
import { CoursesState } from '../redux/courses.state';
import {
  DisenrollUser,
  EnrollUser,
  GetCurrentUser,
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
  currentUser: UserDTO;
  ADMIN_ROLE = ADMIN;

  @Select(CoursesState.coursesResponse) coursesResponse$: Observable<
    CourseDTO[]
  >;
  @Select(CoursesState.coursesError)
  coursesError$: Observable<string>;
  @Select(UsersState.userResponse)
  currentUser$: Observable<UserDTO>;
  @Select(UsersState.userEnrollResponse)
  userEnrollResponse$: Observable<UserEnrollInfoResponse>;
  @Select(UsersState.userEnrollError)
  userEnrollError$: Observable<string>;
  @Select(UsersState.userDisenrollResponse)
  userDisenrollResponse$: Observable<string>;
  @Select(UsersState.userDisenrollError)
  userDisenrollError$: Observable<string>;
  @Select(UsersState.getUserError)
  getUserError$: Observable<string>;

  constructor(
    private store: Store,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.spinner.show();
    this.store.dispatch(new GetCurrentUser());
    this.store.dispatch(new GetCourses());
    this.initLoginErrorResponse();
    this.initCurrentUser();
    this.initGetUserError();
    this.initCoursesResponse();
    //TODO: implement getcourse error response
    this.initUserEnrollResponse();
    this.initUserEnrollError();
    this.initUserDisenrollResponse();
    this.initUserDisenrollError();
  }

  goToDetails(courseId: number): void {
    this.router.navigate([`/course/${courseId}`]);
  }

  isUserProfessor() {
    return this.currentUser?.userRole?.toUpperCase() === PROFESSOR;
  }

  isUserStudent() {
    return this.currentUser?.userRole?.toUpperCase() === STUDENT;
  }

  isUserEnrolled(courseIdToCheck: number) {
    return this.currentUser.coursesEnrolledTo?.find(
      (courseId) => courseId === courseIdToCheck
    );
  }

  enrollUser(courseId: number) {
    this.store.dispatch(new EnrollUser(courseId));
  }

  disenrollUser(courseId: number) {
    this.store.dispatch(new DisenrollUser(courseId));
  }

  addNewCourse() {
    this.router.navigate(['/new-course']);
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

  private initCurrentUser() {
    this.currentUser$
      .pipe(
        filter((value: any) => value !== null),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((currentUserResponse: UserDTO) => {
        this.spinner.hide();
        if (currentUserResponse.userRole === ADMIN) {
          this.router.navigate(['/admin']);
        } else {
          this.currentUser = { ...currentUserResponse };
        }
      });
  }

  private initGetUserError() {
    this.getUserError$
      .pipe(
        filter(
          (value: any) => value !== '' && value !== null && value !== undefined
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) =>
        console.error(error, 'Get User By Id BE error response')
      );
  }

  private initCoursesResponse() {
    this.coursesResponse$
      .pipe(
        filter((value: any) => value?.length),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((coursesResponse) => (this.courses = [...coursesResponse]));
  }

  private initUserEnrollResponse() {
    this.userEnrollResponse$
      .pipe(
        filter((value: any) => value !== null),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((response: UserEnrollInfoResponse) =>
        this.currentUser?.coursesEnrolledTo.push(response.courseId)
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

  private initUserDisenrollResponse() {
    this.userDisenrollResponse$
      .pipe(
        filter((value: any) => value !== null),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((response: UserEnrollInfoResponse) => {
        if (this.currentUser?.coursesEnrolledTo.includes(response?.courseId)) {
          let disenrolledCourseIndex =
            this.currentUser?.coursesEnrolledTo.findIndex(
              (courseId) => courseId === response?.courseId
            );
          this.currentUser?.coursesEnrolledTo.splice(disenrolledCourseIndex, 1);
        }
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
