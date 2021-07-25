import { SelectOption, SortType, TaskPriority, TaskStatus } from './entities';

export const TASK_ID_PREFIX = 'task_';

export const priorityToLabel: Record<TaskPriority, string> = {
  [TaskPriority.Low]: 'Low',
  [TaskPriority.Medium]: 'Medium',
  [TaskPriority.High]: 'High',
};

const priorities = [ TaskPriority.Low, TaskPriority.Medium, TaskPriority.High ];
export const priorityOptions: Array<SelectOption<TaskPriority>> = priorities.map(p => ({
  label: priorityToLabel[p],
  value: p,
}));

export const statusToLabel: Record<TaskStatus, string> = {
  [TaskStatus.Backlog]: 'Backlog',
  [TaskStatus.InProgress]: 'In Progress',
  [TaskStatus.Done]: 'Done',
};

const statuses = [ TaskStatus.Backlog, TaskStatus.InProgress, TaskStatus.Done ];
export const statusOptions: Array<SelectOption<TaskStatus>> = statuses.map(p => ({
  label: statusToLabel[p],
  value: p,
}));

export const sortTypeToLabel: Record<SortType, string> = {
  [SortType.Date]: 'By Date',
  [SortType.Status]: 'By Status',
  [SortType.Priority]: 'By Priority',
};

const sortTypes = [ SortType.Date, SortType.Status, SortType.Priority ];
export const sortTypeOptions: Array<SelectOption<SortType>> = sortTypes.map(p => ({
  label: sortTypeToLabel[p],
  value: p,
}));

export const sortTypeToField: Record<SortType, string> = {
  [SortType.Date]: 'createdAt',
  [SortType.Priority]: 'priority',
  [SortType.Status]: 'status',
};

export const statusToNextStatus: Record<TaskStatus, TaskStatus> = {
  [TaskStatus.Backlog]: TaskStatus.InProgress,
  [TaskStatus.InProgress]: TaskStatus.Done,
  [TaskStatus.Done]: TaskStatus.Backlog,
}

export const priorityToNextPriority: Record<TaskPriority, TaskPriority> = {
  [TaskPriority.Low]: TaskPriority.Medium,
  [TaskPriority.Medium]: TaskPriority.High,
  [TaskPriority.High]: TaskPriority.Low,
}