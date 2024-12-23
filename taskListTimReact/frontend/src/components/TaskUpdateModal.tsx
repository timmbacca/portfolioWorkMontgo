import React, { useState, useEffect } from 'react';
import {Slider, FormControl, InputLabel, Select, MenuItem, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, FormControlLabel, Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { Task } from '../api/taskApi';

interface TaskUpdateModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (updatedTask: Task) => void;
  task: Task;
}

// Utility function to safely parse date strings to Date objectsz
const parseDate = (date: string | Date | null | undefined): Date | null => {
  if (!date) return null;
  return typeof date === 'string' ? new Date(date) : date;
};

const TaskUpdateModal: React.FC<TaskUpdateModalProps> = ({ open, onClose, onSubmit, task }) => {
  const [updatedTask, setUpdatedTask] = useState<Task>({
    ...task,
    startDate: parseDate(task.startDate),
    dueDate: parseDate(task.dueDate),
  });

  useEffect(() => {
    if (open) {
      setUpdatedTask({
        ...task,
        startDate: parseDate(task.startDate),
        dueDate: parseDate(task.dueDate),
      });
    }
  }, [task, open]);

  const handleDateChange = (name: keyof Task, value: Date | null) => {
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };
  
  const handleSelectChange = (name: keyof Task, value: string | null) => {
    setUpdatedTask({ ...updatedTask, [name]: value });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: checked });
  };
  
  const handleSliderChange = (e: Event, value: number | number[]) => {
    setUpdatedTask({ ...updatedTask, progress: value as number });
  };
  
  const handleSubmit = () => {
    // Format dates for backend submission
    const formattedTask = {
      ...updatedTask,
      startDate: updatedTask.startDate instanceof Date ? updatedTask.startDate.toISOString().split('T')[0] : null,
      dueDate: updatedTask.dueDate instanceof Date ? updatedTask.dueDate.toISOString().split('T')[0] : null,
    };
    
    onSubmit(formattedTask);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          value={updatedTask.title}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Description"
          name="description"
          value={updatedTask.description}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />

        {/* Priority Dropdown */}
        <FormControl fullWidth margin="dense">
        <InputLabel>Priority</InputLabel>
        <Select
          label="Priority"
          name="priority"
          value={updatedTask.priority || ''}
          onChange={(e) => handleSelectChange("priority", e.target.value)}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Urgent">Urgent</MenuItem>
        </Select>
         </FormControl>

        {/* Status Dropdown */}
        <FormControl fullWidth margin="dense">
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          name="status"
          value={updatedTask.status || ''}
          onChange={(e) => handleSelectChange("status", e.target.value)}
        >
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="On Hold">On Hold</MenuItem>
        </Select>
        </FormControl>

        <TextField
          label="Assigned To"
          name="assignedTo"
          value={updatedTask.assignedTo || ''}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
<LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    label="Start Date"
    value={updatedTask.startDate instanceof Date ? updatedTask.startDate : null}
    onChange={(newValue) => handleDateChange('startDate', newValue)}
    slotProps={{
      textField: {
        fullWidth: true,
        margin: "dense"
      }
    }}
  />
  <DatePicker
    label="Due Date"
    value={updatedTask.dueDate instanceof Date ? updatedTask.dueDate : null}
    onChange={(newValue) => handleDateChange('dueDate', newValue)}
    slotProps={{
      textField: {
        fullWidth: true,
        margin: "dense"
      }
    }}
  />
</LocalizationProvider>

        <TextField
          label="Estimated Time (hrs)"
          name="estimatedTime"
          type="number"
          value={updatedTask.estimatedTime || ''}
          onChange={handleChange}
          fullWidth
          margin="dense"
          inputProps={{ min: 0, step: 1 }}
        />
        <TextField
          label="Time Spent (hrs)"
          name="timeSpent"
          type="number"
          value={updatedTask.timeSpent || ''}
          onChange={handleChange}
          fullWidth
          margin="dense"
          inputProps={{ min: 0, step: 1 }}
        />
        <TextField
          label="Tags"
          name="tags"
          value={updatedTask.tags || ''}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />

        {/* Progress Slider */}
        <FormControl fullWidth margin="dense">
  <Typography id="progress-slider-label" gutterBottom>
    Progress: {updatedTask.progress}%
  </Typography>
  <Slider
    value={updatedTask.progress || 0}
    onChange={handleSliderChange}
    aria-labelledby="progress-slider-label"
    aria-valuetext={`${updatedTask.progress || 0}%`}
    min={0}
    max={100}
    step={5} // Move in 5% increments
  />
</FormControl>


        <TextField
          label="Comments"
          name="comments"
          value={updatedTask.comments || ''}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={updatedTask.isRecurring || false}
              onChange={handleCheckboxChange}
              name="isRecurring"
            />
          }
          label="Is Recurring"
        />

        {/* Risk Level Dropdown */}
        <FormControl fullWidth margin="dense">
        <InputLabel>Risk Level</InputLabel>
        <Select
          label="Risk Level"
          name="riskLevel"
          value={updatedTask.riskLevel || ''}
          onChange={(e) => handleSelectChange("riskLevel", e.target.value)}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskUpdateModal;
