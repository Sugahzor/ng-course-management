import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LESSONS_URL } from '../../constants.model';
import { LessonDTO } from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  private readonly ROOT_URL = environment.serviceUrlBase;
  private readonly FULL_LESSONS_URL = `${this.ROOT_URL}${LESSONS_URL}`;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getLessons(): Observable<LessonDTO[]> {
    return this.http.get<LessonDTO[]>(this.FULL_LESSONS_URL, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('accessToken')}`,
      },
    });
  }

  saveLesson(lessonInfo: LessonDTO): Observable<LessonDTO> {
    return this.http.post<LessonDTO>(this.FULL_LESSONS_URL, lessonInfo, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('accessToken')}`,
      },
    });
  }

  deleteLesson(lessonId: number) {
    return this.http.delete(`${this.FULL_LESSONS_URL}/${lessonId}`);
  }
}
