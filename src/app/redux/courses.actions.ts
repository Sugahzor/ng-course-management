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
  removeLessonResponse: CourseDTO | null;
  removeLessonError: string;
  saveCourseResponse: CourseDTO | null;
  saveCourseError: string;
  deleteCourseResponse: string;
}

export class GetCourses {
  static readonly type = '[Dasboard Page] Get courses';
  constructor() {}
}

export class GetCourseDetails {
  static readonly type = '[Course Details Page] Get course details';
  constructor(public courseId: number) {}
}

export class ClearCourseDetails {
  static readonly type = '[Course Details Page] Clear Get course details'
}

export class AddLessonsToCourse {
  static readonly type = '[Course] Add Lesson';
  constructor(public curriculum: CurriculumCreationDTO) {}
}

export class RemoveLessonFromCourse {
  static readonly type = '[Course] Remove Lesson';
  constructor(public courseId: number, public lessonId: number) {}
}

export class SaveCourse {
  static readonly type = '[Courses] Save course';
  constructor(public course: SaveCourseRequest) {}
}

export class ClearSaveCourse {
  static readonly type = '[Courses] Save Course Cleanup';
  constructor() {}
}

export class DeleteCourse {
  static readonly type = '[Courses] Delete Course';
  constructor(public courseId: number) {}
}

export class ClearDeleteCourseResponse {
  static readonly type = '[Courses] Delete Course Cleanup';
  constructor() {}
}
