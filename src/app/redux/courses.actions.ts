import { CourseDTO } from '../core/shared/models/app.model';

export interface CoursesStateModel {
  coursesResponse: CourseDTO[] | [];
  coursesErrorResponse: string;
}

export class GetCourses {
  static readonly type = '[Dasboard Page] Get courses';
  constructor() {}
}
