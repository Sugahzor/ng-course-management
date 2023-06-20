import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, takeUntil } from 'rxjs';
import { __values } from 'tslib';
import { BaseComponent } from '../core/shared/base/base.component';
import { CourseDTO, UserDTO } from '../core/shared/models/app.model';
import { UserService } from '../core/shared/services/user.service';
import { GetCourses } from '../redux/courses.actions';
import { CoursesState } from '../redux/courses.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  userResponse: UserDTO;
  coursesResponse: CourseDTO[];
  @Select(CoursesState.coursesResponse) coursesResponse$: Observable<
    CourseDTO[]
  >;
  @Select(CoursesState.coursesErrorResponse)
  coursesErrorResponse$: Observable<string>;

  constructor(private userService: UserService, private store: Store) {
    super();
    this.userResponse = { ...this.userService.getUserResponse() };
    this.store.dispatch(new GetCourses());
  }

  override ngOnInit(): void {
    console.log(this.userResponse, 'userResponse in DashboardComponent');
    this.initCoursesResponse();
    this.initLoginErrorResponse();
  }

  private initCoursesResponse() {
    this.coursesResponse$
      .pipe(
        filter((value: any) => value?.length),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((coursesResponse) => {
        this.coursesResponse = { ...coursesResponse };
        console.log(this.coursesResponse, 'courses ok?');
      });
  }

  private initLoginErrorResponse() {
    this.coursesErrorResponse$
      .pipe(
        filter((value: any) => value !== null && value !== undefined),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) => console.error(error, 'Course BE error response'));
  }
}
