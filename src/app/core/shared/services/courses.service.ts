import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ACCESS_TOKEN, COURSES_URL } from '../../constants.model';
import {
  CourseDTO,
  CurriculumCreationDTO,
  SaveCourseRequest,
} from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly ROOT_URL = environment.serviceUrlBase;
  private FULL_COURSES_URL = `${this.ROOT_URL}${COURSES_URL}`;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(this.FULL_COURSES_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    });
  }

  getCourseDetails(courseId: number) {
    return this.http.get<CourseDTO>(`${this.FULL_COURSES_URL}/${courseId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    });
  }

  addLessonsToCourse(curriculum: CurriculumCreationDTO): Observable<CourseDTO> {
    return this.http.put<CourseDTO>(this.FULL_COURSES_URL, curriculum, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    });
  }

  removeLessonFromCourse(
    courseId: number,
    lessonId: number
  ): Observable<CourseDTO> {
    return this.http.delete<CourseDTO>(
      `${this.FULL_COURSES_URL}/${courseId}/lessonId/${lessonId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      }
    );
  }

  saveCourse(course: SaveCourseRequest): Observable<CourseDTO> {
    return this.http.post<CourseDTO>(this.FULL_COURSES_URL, course, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    });
  }

  deleteCourse(courseId: number) {
    return this.http.delete(`${this.FULL_COURSES_URL}/${courseId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    });
  }
}
