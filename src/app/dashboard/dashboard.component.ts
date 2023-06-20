import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, takeUntil } from 'rxjs';
import { __values } from 'tslib';
import { PROFESSOR, STUDENT } from '../core/constants.model';
import { BaseComponent } from '../core/shared/base/base.component';
import { CourseDTO, UserDTO } from '../core/shared/models/app.model';
import { UserService } from '../core/shared/services/user.service';
import { GetCourses } from '../redux/courses.actions';
import { CoursesState } from '../redux/courses.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent extends BaseComponent implements OnInit {
  userDetails: UserDTO;
  courses: CourseDTO[];
  @Select(CoursesState.coursesResponse) coursesResponse$: Observable<
    CourseDTO[]
  >;
  @Select(CoursesState.coursesError)
  coursesError$: Observable<string>;

  constructor(
    private userService: UserService,
    private store: Store,
    private router: Router
  ) {
    //TODO: persist data on refresh
    super();
    this.userDetails = { ...this.userService.getUserResponse() };
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
    return this.userDetails.userRole.toUpperCase() === PROFESSOR;
  }

  isUserStudent() {
    return this.userDetails.userRole.toUpperCase() === STUDENT;
  }

  enrollUser(courseId: number) {
    console.log('Implement enroll functionality');
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
        filter((value: any) => value !== null && value !== undefined),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) => console.error(error, 'Course BE error response'));
  }
}
