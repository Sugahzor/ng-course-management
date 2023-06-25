import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../core/shared/base/base.component';
import {
  CourseDTO,
  CurriculumCreationDTO,
  LessonDTO,
} from '../core/shared/models/app.model';
import { CoursesState } from '../redux/courses.state';
import {
  AddLessonsToCourse,
  ClearRemoveLessonResponse,
  GetCourseDetails,
  RemoveLessonFromCourse,
} from '../redux/courses.actions';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PROFESSOR } from '../core/constants.model';
import { GetLessons } from '../redux/lessons.actions';
import { LessonsState } from '../redux/lessons.state';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent extends BaseComponent implements OnInit {
  courseId: number;
  courseDetails: CourseDTO;
  displayAvailableLessonList = false;

  @Select(CoursesState.courseDetails)
  courseDetails$: Observable<CourseDTO>;
  @Select(CoursesState.courseDetailsError)
  courseDetailsError$: Observable<string>;
  @Select(LessonsState.saveLessonResponse)
  saveLessonResponse$: Observable<LessonDTO>;
  @Select(CoursesState.removeLessonResponse)
  removeLessonResponse$: Observable<string>;
  @Select(CoursesState.removeLessonError)
  removeLessonError$: Observable<string>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.store.dispatch(new GetCourseDetails(this.courseId));
    this.initCourseDetails();
    this.initLoginErrorResponse();
    this.initSaveLessonResponse();
    this.initRemoveLessonResponse();
    this.initRemoveLessonError();
  }

  isUserProfessor(): boolean {
    return this.cookieService.get('userRole') === PROFESSOR;
  }

  displayAllLessonsList() {
    this.displayAvailableLessonList = true;
    this.store.dispatch(new GetLessons());
  }

  addLessonToCourse(lessonId: number | null) {
    if (!lessonId) {
      // TODO: handle bad lesson.id
      return;
    }
    let curriculum: CurriculumCreationDTO = {
      courseId: this.courseDetails.courseId,
      lessonIdList: [lessonId],
    };
    this.store.dispatch(new AddLessonsToCourse(curriculum));
    window.location.reload();
  }

  removeLessonFromCourse(lessonId: number | null) {
    if (!lessonId) {
      return;
    }
    this.store.dispatch(
      new RemoveLessonFromCourse(this.courseDetails.courseId, lessonId)
    );
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
        filter(
          (value: any) => value !== '' && value !== null && value !== undefined
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) =>
        console.error(error, 'Course Details BE error response')
      );
  }

  private initSaveLessonResponse() {
    this.saveLessonResponse$
      .pipe(
        filter((value: any) => value !== null),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.store.dispatch(new GetCourseDetails(this.courseId));
      });
  }

  private initRemoveLessonResponse() {
    this.removeLessonResponse$
      .pipe(
        filter((value: any) => value !== ''),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.store.dispatch(new ClearRemoveLessonResponse());
        window.location.reload();
      });
  }

  private initRemoveLessonError() {
    this.removeLessonError$
      .pipe(
        filter(
          (value: any) => value !== '' && value !== null && value !== undefined
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) =>
        console.error(error, 'Remove Lesson from Course BE error response')
      );
  }
}
