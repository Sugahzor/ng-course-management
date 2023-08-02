export interface LoginRequestPayload {
  userName: string;
  userPassword: string;
}

export interface LoginResponse {
  jwt: string;
}

export interface UserDTO {
  id: number | null;
  userName: string;
  userEmail: string;
  userRole: string;
  coursesEnrolledTo: number[];
}

export interface CourseDTO {
  courseId: number;
  courseName: string;
  imageUrl: string;
  lessonDTOList: LessonDTO[];
}

export interface LessonDTO {
  id?: number;
  name: string;
  content: string;
  userId: number | string;
  attendanceResponseDTO?: AttendanceResponseDTO;
}

export interface AttendanceResponseDTO {
  id: number;
  attendanceGrade: number;
}

export interface CurriculumCreationDTO {
  courseId: number;
  lessonIdList: number[];
}

export interface SaveCourseRequest {
  name: string;
  imageUrl: string;
  userId: number;
}

export interface UserEnrollInfoResponse {
  courseId: number;
  enrolled: boolean;
}
