export interface LoginData {
  userEmail: string;
  userPassword: string;
}

export interface UserDTO {
  id: number | null;
  userName: string;
  userEmail: string;
  userRole: string;
}

export interface CourseDTO {
  courseId: number;
  courseName: string;
  imageUrl: string;
  lessons: LessonDTO[];
}

export interface LessonDTO {
  id: number;
  name: string;
  content: string;
  userId: number;
  attendanceResponseDTO: AttendanceResponseDTO;
}

export interface AttendanceResponseDTO {
  id: number;
  attendanceGrade: number;
}
