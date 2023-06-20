import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../core/shared/base/base.component';
import { CourseDTO } from '../core/shared/models/app.model';
import { CoursesState } from '../redux/courses.state';
import { GetCourseDetails } from '../redux/courses.actions';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent extends BaseComponent implements OnInit {
  courseId: number;
  courseDetails: CourseDTO;
  @Select(CoursesState.courseDetails) courseDetails$: Observable<CourseDTO>;
  @Select(CoursesState.courseDetailsError)
  courseDetailsError$: Observable<string>;

  constructor(private store: Store, private route: ActivatedRoute) {
    super();
  }

  override ngOnInit(): void {
    this.getCourseDetails(this.route.snapshot.paramMap.get('id'));
    this.initCourseDetails();
    this.initLoginErrorResponse();
  }

  private getCourseDetails(courseId: any) {
    this.store.dispatch(new GetCourseDetails(courseId));
  }

  private initCourseDetails() {
    this.courseDetails$
      .pipe(
        filter((value: any) => value !== null),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        (courseDetailsResponse: CourseDTO) =>
          (this.courseDetails = { ...courseDetailsResponse })
      );
  }

  private initLoginErrorResponse() {
    this.courseDetailsError$
      .pipe(
        filter((value: any) => value !== null && value !== undefined),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) =>
        console.error(error, 'Course Details BE error response')
      );
  }
}
