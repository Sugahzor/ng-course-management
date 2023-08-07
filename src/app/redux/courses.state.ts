import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { CourseDTO } from '../core/shared/models/app.model';
import { CoursesService } from '../core/shared/services/courses.service';
import {
  AddLessonsToCourse,
  ClearDeleteCourseResponse,
  ClearSaveCourse,
  CoursesStateModel,
  DeleteCourse,
  GetCourseDetails,
  GetCourses,
  RemoveLessonFromCourse,
  SaveCourse,
} from './courses.actions';

@State<CoursesStateModel>({
  name: 'courses',
  defaults: {
    coursesResponse: [],
    coursesError: '',
    courseDetails: null,
    courseDetailsError: '',
    addLessonsResponse: null,
    addLessonsError: '',
    removeLessonResponse: null,
    removeLessonError: '',
    saveCourseResponse: null,
    saveCourseError: '',
    deleteCourseResponse: '',
  },
})
@Injectable()
export class CoursesState {
  constructor(private coursesService: CoursesService) {}

  @Selector()
  static coursesResponse(state: CoursesStateModel) {
    return state.coursesResponse;
  }

  @Selector()
  static coursesError(state: CoursesStateModel) {
    return state.coursesError;
  }

  @Selector()
  static courseDetails(state: CoursesStateModel) {
    return state.courseDetails;
  }

  @Selector()
  static courseDetailsError(state: CoursesStateModel) {
    return state.courseDetailsError;
  }

  @Selector()
  static addLessonsResponse(state: CoursesStateModel) {
    return state.addLessonsResponse;
  }

  @Selector()
  static addLessonsError(state: CoursesStateModel) {
    return state.addLessonsError;
  }

  @Selector()
  static removeLessonResponse(state: CoursesStateModel) {
    return state.removeLessonResponse;
  }

  @Selector()
  static removeLessonError(state: CoursesStateModel) {
    return state.removeLessonError;
  }

  @Selector()
  static saveCourseResponse(state: CoursesStateModel) {
    return state.saveCourseResponse;
  }

  @Selector()
  static saveCourseError(state: CoursesStateModel) {
    return state.saveCourseError;
  }

  @Selector()
  static deleteCourseResponse(state: CoursesStateModel) {
    return state.deleteCourseResponse;
  }

  @Action(GetCourses)
  getCourses(ctx: StateContext<CoursesStateModel>) {
    return this.coursesService.getCourses().pipe(
      catchError((error: string) => {
        ctx.patchState({
          coursesError: error,
        });
        throw throwError(() => new Error(error));
      }),
      tap((coursesResponse: CourseDTO[]) => {
        ctx.patchState({
          coursesResponse: coursesResponse,
        });
      })
    );
  }

  @Action(GetCourseDetails)
  getCourseDetails(
    ctx: StateContext<CoursesStateModel>,
    action: GetCourseDetails
  ) {
    return this.coursesService.getCourseDetails(action.courseId).pipe(
      catchError((error: string) => {
        ctx.patchState({
          courseDetailsError: error,
        });
        throw throwError(() => new Error(error));
      }),
      tap((courseDetailsResponse: CourseDTO) => {
        ctx.patchState({
          courseDetails: courseDetailsResponse,
        });
      })
    );
  }

  @Action(AddLessonsToCourse)
  addLessonsToCourse(
    ctx: StateContext<CoursesStateModel>,
    action: AddLessonsToCourse
  ) {
    return this.coursesService.addLessonsToCourse(action.curriculum).pipe(
      catchError((error: string) => {
        ctx.patchState({
          addLessonsError: error,
        });
        throw throwError(() => new Error(error));
      }),
      tap((addLessonsResponse) => {
        ctx.patchState({
          addLessonsResponse: addLessonsResponse,
        });
      })
    );
  }

  @Action(RemoveLessonFromCourse)
  removeLessonFromCourse(
    ctx: StateContext<CoursesStateModel>,
    action: RemoveLessonFromCourse
  ) {
    return this.coursesService
      .removeLessonFromCourse(action.courseId, action.lessonId)
      .pipe(
        catchError((error: string) => {
          ctx.patchState({
            removeLessonError: error,
          });
          throw throwError(() => new Error(error));
        }),
        tap((removeLessonResponse) => {
          ctx.patchState({
            removeLessonResponse: removeLessonResponse,
          });
        })
      );
  }

  @Action(SaveCourse)
  saveCourse(ctx: StateContext<CoursesStateModel>, action: SaveCourse) {
    return this.coursesService.saveCourse(action.course).pipe(
      catchError((error: string) => {
        ctx.patchState({
          saveCourseError: error,
        });
        throw throwError(() => new Error(error));
      }),
      tap((saveCourseResponse) =>
        ctx.patchState({
          saveCourseResponse: saveCourseResponse,
        })
      )
    );
  }

  @Action(ClearSaveCourse)
  clearSaveCourse(ctx: StateContext<CoursesStateModel>) {
    ctx.patchState({
      saveCourseResponse: null,
    });
  }

  @Action(DeleteCourse)
  deleteCourse(ctx: StateContext<CoursesStateModel>, action: DeleteCourse) {
    return this.coursesService.deleteCourse(action.courseId).pipe(
      tap(() =>
        ctx.patchState({
          deleteCourseResponse: 'complete',
        })
      )
    );
  }

  @Action(ClearDeleteCourseResponse)
  clearDeleteCourseResponse(ctx: StateContext<CoursesStateModel>) {
    ctx.patchState({
      deleteCourseResponse: '',
    });
  }
}
