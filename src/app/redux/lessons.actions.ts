import { LessonDTO } from '../core/shared/models/app.model';

export interface LessonsStateModel {
  lessonsList: LessonDTO[] | null;
  lessonsError: string;
  saveLessonResponse: LessonDTO | null;
  saveLessonError: string;
}

export class GetLessons {
  static readonly type = '[Lessons] Get All Lessons';
  constructor() {}
}

export class SaveLesson {
  static readonly type = '[Lessons] Save New Lesson';
  constructor(public lessonInfo: LessonDTO) {}
}
