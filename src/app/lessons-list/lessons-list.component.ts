import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { CookieService } from 'ngx-cookie-service';
import { filter, Observable, takeUntil } from 'rxjs';
import { BaseComponent } from '../core/shared/base/base.component';
import { CourseDTO, LessonDTO, UserDTO } from '../core/shared/models/app.model';
import { CoursesState } from '../redux/courses.state';
import {
  ClearDeleteLessonResponse,
  DeleteLesson,
  SaveLesson,
} from '../redux/lessons.actions';
import { LessonsState } from '../redux/lessons.state';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss'],
})
export class LessonsListComponent extends BaseComponent implements OnInit {
  userDetails: UserDTO;
  lessonsList: LessonDTO[];
  viewAvailableLessonList: LessonDTO[];
  addLessonForm: FormGroup;
  lessonContent: File | null = null;

  @Input() courseDetails: CourseDTO;
  @Output() addCurriculum = new EventEmitter();

  @Select(LessonsState.lessonsList) lessonsList$: Observable<LessonDTO[]>;
  @Select(LessonsState.lessonsError) lessonsError$: Observable<string>;
  @Select(CoursesState.addLessonsResponse)
  addLessonsResponse$: Observable<CourseDTO>;
  @Select(CoursesState.addLessonsError) addLessonsError$: Observable<string>;
  @Select(LessonsState.saveLessonResponse)
  saveLessonResponse$: Observable<LessonDTO>;
  @Select(LessonsState.deleteLessonResponse)
  deleteLessonResponse$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private store: Store
  ) {
    super();
    this.addLessonForm = this.fb.group({
      lessonName: new FormControl(''),
    });
  }

  override ngOnInit(): void {
    this.initLessonsList();
    this.initLessonsError();
    this.initAddLessonsResponse();
    this.initAddLessonsError();
    this.initSaveLessonResponse();
    this.initDeleteLessonResponse();
  }

  onSelectFile(file: File) {
    console.log(file, 'file data');
    const formData = new FormData();
    formData.append('thumbnail', file);
    console.log(formData, 'does THIS dorm data have info?');

    this.lessonContent = file;
  }

  saveLesson() {
    console.log('saveLesson called');
    if (this.addLessonForm.get('lessonName')?.pristine) {
      //TODO: add errrors in template
      this.addLessonForm.get('lessonName')?.setErrors({ required: true });
      return;
    }
    if (!this.lessonContent) {
      console.error('Add lesson content');
      return;
    }
    const formData = new FormData();
    formData.append('name', this.addLessonForm.get('lessonName')?.value);
    formData.append('content', this.lessonContent);
    formData.append('userId', this.cookieService.get('userId'));
    let lessonInfo: LessonDTO = {
      name: formData.get('name') as string,
      // content: formData.get('content') as string,
      content: '4pyTIMOgIGxhIG1vZGU=',
      userId: formData.get('userId') as string,
    };
    this.store.dispatch(new SaveLesson(lessonInfo));
  }

  addLessonToCourse(lessonId: number | null) {
    if (!lessonId) {
      // TODO: handle bad lesson.id
      return;
    }
    this.addCurriculum.emit(lessonId);
  }

  deleteLesson(lessonId: number | null) {
    if (!lessonId) {
      // TODO: handle bad lesson.id
      return;
    }
    this.store.dispatch(new DeleteLesson(lessonId));
  }

  private initLessonsList() {
    this.lessonsList$
      .pipe(
        filter((value: any) => value),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((lessonsResponse: LessonDTO[]) => {
        this.lessonsList = [...lessonsResponse];
        let courseLessonIds = this.courseDetails.lessonDTOList.map(
          (courseLesson) => courseLesson.id
        );
        this.viewAvailableLessonList = this.lessonsList.filter(
          (dbLesson) => courseLessonIds.indexOf(dbLesson.id) === -1
        );
      });
  }

  private initLessonsError() {
    this.lessonsError$
      .pipe(
        filter(
          (value: any) => value !== '' && value !== null && value !== undefined
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) =>
        console.error(error, 'Lessons List BE error response')
      );
  }

  private initAddLessonsResponse() {
    this.addLessonsResponse$
      .pipe(
        filter(
          (value: any) => value !== '' && value !== null && value !== undefined
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        (addLessonsResponse) => (this.courseDetails = { ...addLessonsResponse })
      );
  }

  private initAddLessonsError() {
    this.addLessonsError$
      .pipe(
        filter(
          (value: any) => value !== '' && value !== null && value !== undefined
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((error) =>
        console.error(error, 'Add Lessons to Course BE error response')
      );
  }

  private initSaveLessonResponse() {
    this.saveLessonResponse$
      .pipe(
        filter((value: any) => value !== null),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((saveLessonResponse: LessonDTO) => {
        if (this.courseDetails?.courseId) {
          this.addCurriculum.emit(saveLessonResponse.id);
        }
      });
  }

  private initDeleteLessonResponse() {
    this.deleteLessonResponse$
      .pipe(
        filter((value: any) => value !== ''),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.store.dispatch(new ClearDeleteLessonResponse());
        window.location.reload();
      });
  }
}
