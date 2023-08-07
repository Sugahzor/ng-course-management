import { CoursesState } from './courses.state';
import { UsersState } from './users.state';
import { LessonsState } from './lessons.state';
import { AuthState } from './auth.state';
import { AdminState } from './admin.state';

export const appStates = [
  UsersState,
  AuthState,
  CoursesState,
  LessonsState,
  AdminState,
];
