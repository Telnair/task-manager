import { Box, Button, FormControl, MenuItem, Select, TextField } from '@material-ui/core';
import { uniqueId } from 'lodash';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { priorityOptions, statusOptions, TASK_ID_PREFIX } from '../consts';
import { Task, TaskPriority, TaskStatus } from '../entities';

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  editedTask: Task | undefined;
}

export const TaskForm: React.FC<TaskFormProps> = (props) => {
  const { onSubmit, editedTask } = props;
  const [ description, setDescription ] = useState('');
  const [ priority, setPriority ] = useState<TaskPriority>(TaskPriority.Medium);
  const [ status, setStatus ] = useState<TaskStatus>(TaskStatus.Backlog);

  useEffect(() => {
    if (editedTask) {
      setDescription(editedTask.description);
      setPriority(editedTask.priority);
      setStatus(editedTask.status);
    }
  }, [ editedTask ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const task: Task = {
      ...(editedTask ? editedTask : {
        id: uniqueId(TASK_ID_PREFIX),
        createdAt: new Date().toISOString(),
      }),
      status,
      description,
      priority,
    };

    onSubmit(task);
    resetForm();
  };

  const resetForm = () => {
    setDescription('');
    setPriority(TaskPriority.Medium);
    setStatus(TaskStatus.Backlog);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handlePrioritySelect = (e: React.ChangeEvent<{ value: unknown }>) => {
    setPriority(e.target.value as TaskPriority);
  };

  const handleStatusSelect = (e: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(e.target.value as TaskStatus);
  };

  const submitButtonText = editedTask ? 'Update Task' : 'Create task';

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        id="standard-basic"
        variant="outlined"
        label="Description"
        value={description}
        onChange={handleInput}
      />
      <Box mx={2}>
        <FormControl variant="outlined">
          <Select
            labelId="task-priority-label"
            id="task-priority"
            value={priority}
            onChange={handlePrioritySelect}
          >
            {priorityOptions.map(priority => (
              <MenuItem value={priority.value} key={priority.value}>{priority.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box mr={2}>
        <FormControl variant="outlined">
          <Select
            labelId="task-status-label"
            id="task-status"
            value={status}
            onChange={handleStatusSelect}
          >
            {statusOptions.map(status => (
              <MenuItem value={status.value} key={status.value}>{status.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button type="submit" variant="contained" color="primary" disabled={!description} size="large">
        {submitButtonText}
      </Button>
    </Box>
  );
}