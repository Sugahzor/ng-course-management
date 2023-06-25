import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../core/shared/base/base.component';
import { CourseDTO, CurriculumCreationDTO, LessonDTO, UserDTO } from '../core/shared/models/app.model';
import { CoursesState } from '../redux/courses.state';
import { AddLessonsToCourse, GetCourseDetails } from '../redux/courses.actions';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../core/shared/services/user.service';
import { PROFESSOR } from '../core/constants.model';
import { GetLessons } from '../redux/lessons.actions';
import { LessonsState } from '../redux/lessons.state';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent extends BaseComponent implements OnInit {
  courseId: number;
  courseDetails: CourseDTO;
  userDetails: UserDTO;
  displayAvailableLessonList = false;

  @Select(CoursesState.courseDetails) courseDetails$: Observable<CourseDTO>;
  @Select(CoursesState.courseDetailsError)
  courseDetailsError$: Observable<string>;
  @Select(LessonsState.saveLessonResponse)
  saveLessonResponse$: Observable<LessonDTO>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.store.dispatch(new GetCourseDetails(this.courseId));
    this.userDetails = { ...this.userService.getUserResponse() };
    this.initCourseDetails();
    this.initLoginErrorResponse();
    this.initSaveLessonResponse();
  }

  isUserProfessor(): boolean {
    return this.userDetails.userRole === PROFESSOR;
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
        // addLessonToCourse from lesson 
        this.store.dispatch(new GetCourseDetails(this.courseId));
      });
  }
}
