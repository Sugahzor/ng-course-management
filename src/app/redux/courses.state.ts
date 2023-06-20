import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { CourseDTO } from '../core/shared/models/app.model';
import { CoursesService } from '../core/shared/services/courses.service';
import {
  CoursesStateModel,
  GetCourseDetails,
  GetCourses,
} from './courses.actions';

@State<CoursesStateModel>({
  name: 'courses',
  defaults: {
    coursesResponse: [],
    coursesError: '',
    courseDetails: null,
    courseDetailsError: '',
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
}
