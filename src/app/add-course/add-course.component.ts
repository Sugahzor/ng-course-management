import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { CookieService } from 'ngx-cookie-service';
import { filter, Observable, takeUntil } from 'rxjs';
import { BaseComponent } from '../core/shared/base/base.component';
import { CourseDTO, SaveCourseRequest } from '../core/shared/models/app.model';
import { SaveCourse } from '../redux/courses.actions';
import { CoursesState } from '../redux/courses.state';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent extends BaseComponent implements OnInit {
  addCourseForm: FormGroup;
  canAddLessons = false;
  newCourseDetails: CourseDTO;

  @Select(CoursesState.saveCourseResponse)
  saveCourseResponse$: Observable<CourseDTO>;
  @Select(CoursesState.saveCourseError)
  saveCourseError$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private store: Store,
    private router: Router
  ) {
    super();
    this.addCourseForm = this.fb.group({
      courseName: new FormControl(''),
      courseImageUrl: new FormControl(''),
    });
  }

  override ngOnInit(): void {
    this.initSaveCourseResponse();
    this.initSaveCourseError();
  }

  saveCourse() {
    //TODO: implement required handling
    let course: SaveCourseRequest = {
      name: this.addCourseForm.get('courseName')?.value,
      imageUrl: this.addCourseForm.get('courseImageUrl')?.value,
      userId: parseInt(this.cookieService.get('userId')),
    };
    this.store.dispatch(new SaveCourse(course));
  }

  private initSaveCourseResponse() {
    this.saveCourseResponse$
      .pipe(
        filter((value: any) => value !== null),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((saveCourseResponse: CourseDTO) => {
        this.router.navigate([`/course/${saveCourseResponse.courseId}`]);
      });
  }

  private initSaveCourseError() {
    this.saveCourseError$
      .pipe(
        filter(
          (value: any) => value !== '' && value !== null && value !== undefined
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) =>
        console.error(error, 'Save Course BE error response')
      );
  }
}
