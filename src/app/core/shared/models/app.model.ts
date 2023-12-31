export interface LoginRequestPayload {
  userName: string;
  userPassword: string;
}

export interface LoginResponse {
  jwt: string;
  expiration: string;
}

export interface UserDTO {
  id: number;
  userName: string;
  userEmail: string;
  userRole: string;
  coursesEnrolledTo: number[];
}

export interface RegisterUserDTO {
  userName: string;
  userEmail: string;
  userPassword: string;
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
  userId?: number | string;
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
}

export interface UserEnrollInfoResponse {
  courseId: number;
  enrolled: boolean;
}
