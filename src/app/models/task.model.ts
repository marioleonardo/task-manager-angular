export interface Task {
    id: string;
    title: string;
    description?: string; // Optional description
    completed: boolean;
  }