export enum TaskStatus {
  Backlog,
  InProgress,
  Done
}

export enum TaskPriority {
  Low,
  Medium,
  High
}

export interface Task {
  id: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
}

export enum SortType {
  Date = 'date',
  Status = 'status',
  Priority = 'priority'
}

export interface SelectOption<T> {
  label: string;
  value: T;
}