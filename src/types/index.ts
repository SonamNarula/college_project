export type Priority = 'low' | 'medium' | 'high';
export type TaskFilter = 'all' | 'completed' | 'pending';
export type PlacementStatus = 'applied' | 'interview' | 'rejected' | 'selected';
export type Page = 'dashboard' | 'tasks' | 'study' | 'placement' | 'analytics';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
}

export interface StudyLog {
  date: string; // YYYY-MM-DD
  hours: number;
  dsaQuestions: number;
}

export interface PlacementApp {
  id: string;
  company: string;
  role: string;
  status: PlacementStatus;
  appliedDate: string;
  notes: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
