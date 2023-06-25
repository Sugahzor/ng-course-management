import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { LessonDTO } from '../core/shared/models/app.model';
import { LessonsService } from '../core/shared/services/lessons.service';
import {
  ClearDeleteLessonResponse,
  DeleteLesson,
  GetLessons,
  LessonsStateModel,
  SaveLesson,
} from './lessons.actions';

@State<LessonsStateModel>({
  name: 'lessons',
  defaults: {
    lessonsList: null,
    lessonsError: '',
    saveLessonResponse: null,
    saveLessonError: '',
    deleteLessonResponse: '',
    deleteLessonError: '',
  },
})
@Injectable()
export class LessonsState {
  constructor(private lessonsService: LessonsService) {}

  @Selector()
  static lessonsList(state: LessonsStateModel) {
    return state.lessonsList;
  }

  @Selector()
  static lessonsError(state: LessonsStateModel) {
    return state.lessonsError;
  }

  @Selector()
  static saveLessonResponse(state: LessonsStateModel) {
    return state.saveLessonResponse;
  }

  @Selector()
  static saveLessonError(state: LessonsStateModel) {
    return state.saveLessonError;
  }

  @Selector()
  static deleteLessonResponse(state: LessonsStateModel) {
    return state.deleteLessonResponse;
  }

  @Action(GetLessons)
  getLessons(ctx: StateContext<LessonsStateModel>) {
    return this.lessonsService.getLessons().pipe(
      catchError((error: any) => {
        ctx.patchState({
          lessonsError: error,
        });
        return throwError(() => new Error(error));
      }),
      tap((lessonsResponse: LessonDTO[]) => {
        ctx.patchState({
          lessonsList: lessonsResponse,
        });
      })
    );
  }

  @Action(SaveLesson)
  saveKLesson(ctx: StateContext<LessonsStateModel>, action: SaveLesson) {
    return this.lessonsService.saveLesson(action.lessonInfo).pipe(
      catchError((error: any) => {
        ctx.patchState({
          saveLessonError: error,
        });
        return throwError(() => new Error(error));
      }),
      tap((saveLessonResponse) => {
        ctx.patchState({
          saveLessonResponse: saveLessonResponse,
        });
      })
    );
  }

  @Action(DeleteLesson)
  deleteLesson(ctx: StateContext<LessonsStateModel>, action: DeleteLesson) {
    return this.lessonsService.deleteLesson(action.lessonId).pipe(
      catchError((error: string) => {
        ctx.patchState({
          deleteLessonError: error,
        });
        throw throwError(() => new Error(error));
      }),
      tap((response: any) => {
        ctx.patchState({
          deleteLessonResponse: 'complete',
        });
      })
    );
  }

  @Action(ClearDeleteLessonResponse)
  clearDeleteLessonResponse(ctx: StateContext<LessonsStateModel>) {
    ctx.patchState({
      deleteLessonResponse: '',
    });
  }
}
