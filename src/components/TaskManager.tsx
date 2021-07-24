
import { Box, Typography } from '@material-ui/core';
import { sortBy, toLower } from 'lodash';
import React, { useMemo, useState } from 'react';
import { SortType, Task, TaskStatus } from '../entities';
import { Filters } from './Filters';
import { TaskForm } from './TaskForm';
import { TasksList } from './TasksList';

const sortTypeToField: Record<SortType, string> = {
  [SortType.Date]: 'createdAt',
  [SortType.Priority]: 'priority',
  [SortType.Status]: 'status',
}

export const TaskManager: React.FC = () => {
  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [ sortType, setSortType ] = useState<SortType>(SortType.Date);
  const [ searchStr, setSearchStr ] = useState('');
  const [ filterBy, setFilterBy ] = useState<TaskStatus | undefined>(undefined);
  const [ editedTaskId, setEditedTaskId ] = useState<string | null>(null);

  const handleNewTask = (task: Task) => {
    setTasks(prev => ([ ...prev, task ]));
  }

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task));
    setEditedTaskId(null);
  }

  const handleTaskEdit = (taskId: string) => {
    setEditedTaskId(taskId);
  }

  const handleTaskDeletion = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }

  const formattedTasks = useMemo(() => {
    let sortedTasks = sortBy(tasks, sortTypeToField[sortType]);

    if (filterBy !== undefined) {
      sortedTasks = sortedTasks.filter(task => task.status === filterBy);
    }

    if (searchStr) {
      sortedTasks = sortedTasks.filter(task => toLower(task.description).startsWith(toLower(searchStr)))
    }

    return sortedTasks;
  }, [ tasks, sortType, filterBy, searchStr ]);

  const editedTask = useMemo(() => tasks.find(t => t.id === editedTaskId), [ editedTaskId, tasks ]);

  return (
    <Box textAlign="center" py={2}>
      <Box mb={2}>
        <Typography variant="h3">
          Task Manager
        </Typography>
      </Box>
      <TaskForm onSubmit={editedTaskId ? handleUpdateTask : handleNewTask} editedTask={editedTask} />
      <Filters 
        sortType={sortType}
        searchStr={searchStr}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        setSearchStr={setSearchStr}
        setSortType={setSortType}
      />
      <TasksList 
        tasks={formattedTasks} 
        onEditTask={handleTaskEdit} 
        onDeleteTask={handleTaskDeletion} 
        editedTaskId={editedTaskId} 
      />
    </Box>
  );
};