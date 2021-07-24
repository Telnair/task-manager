import { Box, Typography, useTheme, IconButton } from '@material-ui/core';
import React from 'react';
import { priorityToLabel, statusToLabel } from '../consts';
import { Task } from '../entities';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

interface TasksListProps {
  editedTaskId: string | null;
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string) => void;
}

export const TasksList: React.FC<TasksListProps> = (props) => {
  const { tasks, onDeleteTask, onEditTask, editedTaskId } = props;
  const theme = useTheme();
  return (
    <Box mt={3} display="flex" flexDirection="column" alignItems="center">
      {tasks.map(task => (
        <Box
          key={task.id}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={8}
          p={1}
          bgcolor={editedTaskId === task.id ? theme.palette.primary.light : theme.palette.common.white}
        >
          <Box>
            <Typography variant="h6">
              {task.description}
            </Typography>
          </Box>
          <Box mx={2} borderRadius={4} p={1} bgcolor={theme.palette.info.main} color={theme.palette.info.contrastText}>
            {priorityToLabel[task.priority]}
          </Box>
          <Box borderRadius={4} p={1} bgcolor={theme.palette.warning.main} color={theme.palette.warning.contrastText}>
            {statusToLabel[task.status]}
          </Box>
          <Box ml={3}>
            <IconButton onClick={() => onEditTask(task.id)}>
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
          <IconButton onClick={() => onDeleteTask(task.id)}>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
    </Box>
  )
};