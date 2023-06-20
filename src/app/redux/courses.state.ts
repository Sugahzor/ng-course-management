import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { CourseDTO } from '../core/shared/models/app.model';
import { CoursesService } from '../core/shared/services/courses.service';
import { CoursesStateModel, GetCourses } from './courses.actions';

@State<CoursesStateModel>({
  name: 'courses',
  defaults: {
    coursesResponse: [],
    coursesErrorResponse: '',
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
  static coursesErrorResponse(state: CoursesStateModel) {
    return state.coursesErrorResponse;
  }

  @Action(GetCourses)
  getCourses(ctx: StateContext<CoursesStateModel>) {
    return this.coursesService.getCourses().pipe(
      catchError((error: string) => {
        ctx.patchState({
          coursesErrorResponse: error,
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
}
