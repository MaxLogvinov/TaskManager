export interface AuthState {
  isAuthenticated: boolean;
  user: { email: string; role: string } | null;
}

export interface Task {
  id: number;
  title: string;
  email: string;
  text: string;
  status: string;
}

export interface TasksState {
  items: Task[];
  nextId: number;
}
