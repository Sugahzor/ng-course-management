import {
  SaveCourseRequest,
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
  removeLessonResponse: string;
  removeLessonError: string;
  saveCourseResponse: CourseDTO | null;
  saveCourseError: string;
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

export class RemoveLessonFromCourse {
  static readonly type = '[Course] Remove Lesson';
  constructor(public courseId: number, public lessonId: number) {}
}

export class ClearRemoveLessonResponse {
  static readonly type = '[Courses] Remove Lesson Cleanup';
  constructor() {}
}

export class SaveCourse {
  static readonly type = '[Courses] Save course';
  constructor(public course: SaveCourseRequest) {}
}
