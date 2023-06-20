import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { COURSES_URL } from '../../constants.model';
import { CourseDTO } from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly ROOT_URL = environment.serviceUrlBase;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(`${this.ROOT_URL}${COURSES_URL}`);
  }

  getCourseDetails(courseId: number) {
    return this.http.get<CourseDTO>(`${this.ROOT_URL}${COURSES_URL}/${courseId}`);
  }
}
