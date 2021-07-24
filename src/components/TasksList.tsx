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
          justifyContent="space-between"
          borderRadius={8}
          width={800}
          maxWidth="100%"
          p={1}
          bgcolor={editedTaskId === task.id ? theme.palette.primary.light : theme.palette.common.white}
        >
          <Typography variant="h6">
            <Box width={300} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" textAlign="left">
              {task.description}
            </Box>
          </Typography>
          <Box display="flex" justifyContent="center">
            <Box mr={1} borderRadius={4} p={1} bgcolor={theme.palette.info.main} color={theme.palette.info.contrastText}>
              {priorityToLabel[task.priority]}
            </Box>
            <Box borderRadius={4} p={1} bgcolor={theme.palette.warning.main} color={theme.palette.warning.contrastText}>
              {statusToLabel[task.status]}
            </Box>
          </Box>
          <Box>
            <IconButton onClick={() => onEditTask(task.id)}>
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => onDeleteTask(task.id)}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  )
};