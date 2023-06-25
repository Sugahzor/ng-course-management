import {
  CourseDTO,
  CurriculumCreationDTO,
} from '../core/shared/models/app.model';

export interface CoursesStateModel {
  coursesResponse: CourseDTO[] | [];
  coursesError: string;
  courseDetails: CourseDTO | null;
  courseDetailsError: string;
  addLessonsResponse: CourseDTO | null;
  addLessonsError: string;
}

export class GetCourses {
  static readonly type = '[Dasboard Page] Get courses';
  constructor() {}
}

export class GetCourseDetails {
  static readonly type = '[Course Details Page] Get course details';
  constructor(public courseId: number) {}
}

export class AddLessonsToCourse {
  static readonly type = '[Course] Add Lesson';
  constructor(public curriculum: CurriculumCreationDTO) {}
}
