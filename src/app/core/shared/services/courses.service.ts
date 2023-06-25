import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { COURSES_URL } from '../../constants.model';
import { CourseDTO, CurriculumCreationDTO, LessonDTO } from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly ROOT_URL = environment.serviceUrlBase;
  private FULL_COURSES_URL = `${this.ROOT_URL}${COURSES_URL}`;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(this.FULL_COURSES_URL);
  }

  getCourseDetails(courseId: number) {
    return this.http.get<CourseDTO>(`${this.FULL_COURSES_URL}/${courseId}`);
  }

  addLessonsToCourse(curriculum: CurriculumCreationDTO): Observable<CourseDTO> {
    return this.http.put<CourseDTO>(this.FULL_COURSES_URL, curriculum);
  }
}
