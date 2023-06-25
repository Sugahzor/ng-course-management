import { LessonDTO } from '../core/shared/models/app.model';

export interface LessonsStateModel {
  lessonsList: LessonDTO[] | null;
  lessonsError: string;
  saveLessonResponse: LessonDTO | null;
  saveLessonError: string;
  deleteLessonResponse: string;
  deleteLessonError: string;
}

export class GetLessons {
  static readonly type = '[Lessons] Get All Lessons';
  constructor() {}
}

export class SaveLesson {
  static readonly type = '[Lessons] Save New Lesson';
  constructor(public lessonInfo: LessonDTO) {}
}

export class DeleteLesson {
  static readonly type = '[Lessons] Delete Lesson';
  constructor(public lessonId: number) {}
}

export class ClearDeleteLessonResponse {
  static readonly type = '[Lessons] Clear Delete Lesson Response';
  constructor() {}
}
