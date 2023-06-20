import { CourseDTO } from '../core/shared/models/app.model';

export interface CoursesStateModel {
  coursesResponse: CourseDTO[] | [];
  coursesError: string;
  courseDetails: CourseDTO | null;
  courseDetailsError: string;
}

export class GetCourses {
  static readonly type = '[Dasboard Page] Get courses';
  constructor() {}
}

export class GetCourseDetails {
  static readonly type = '[Course Details Page] Get course details';
  constructor(public courseId: number) {}
}
