// frontend/src/components/TaskList.tsx

import React, { useEffect, useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import TaskUpdateModal from './TaskUpdateModal';
import {
  TextField, Select, MenuItem, Button, FormControl, InputLabel, FormGroup,
  FormControlLabel, Checkbox, Slider, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, Paper, TablePagination,
  Link
} from '@mui/material';
import { validateInput } from '../utils/validation';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getTasks, addTask, updateTask, deleteTask, Task } from '../api/taskApi';

const TaskTrackerPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<keyof Task>('title');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [tags, setTags] = useState('');
  const [progress, setProgress] = useState<number>(0);
  const [comments, setComments] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [riskLevel, setRiskLevel] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Fetch tasks on component load
  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tasks, searchQuery, filterStatus, sortOrder, sortField]);

  // Validation logic
  const validateField = (fieldName: string, value: string) => {
    let error = '';

    switch (fieldName) {
      case 'title':
        if (!value.trim()) {
          error = 'Task title is required.';
        } else {
          error = validateInput(value, /^[a-zA-Z0-9\s]+$/, 255);
        }
        break;

      case 'description':
        if (!value.trim()) {
          error = 'Task description is required.';
        } else {
          error = validateInput(value, /^[a-zA-Z0-9\s.,!?]+$/, 1000);
        }
        break;

      case 'assignedTo':
        if (!value.trim()) {
          error = 'Assigned To is required.';
        } else {
          error = validateInput(value, /^[a-zA-Z\s]+$/, 255);
        }
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
  };

  const validateAllFields = () => {
    validateField('title', newTitle);
    validateField('description', newDescription);
    validateField('assignedTo', assignedTo);

    const hasErrors = Object.values(errors).some((error) => error);
    return !hasErrors;
  };

  const fetchTasks = async () => {
    const tasks = await getTasks();
    const formattedTasks = tasks.map((task: any) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      assignedTo: task.assigned_to,
      startDate: task.start_date ? new Date(task.start_date) : null,
      dueDate: task.due_date ? new Date(task.due_date) : null,
      estimatedTime: task.estimated_time,
      timeSpent: task.time_spent,
      tags: task.tags,
      progress: task.progress,
      comments: task.comments,
      isRecurring: task.is_recurring,
      riskLevel: task.risk_level,
    }));
    setTasks(formattedTasks);
    console.log("Formatted tasks:", formattedTasks); // For debugging
  };


  const applyFilters = () => {
    let displayedTasks = tasks;
  
    // Filter by search query
    if (searchQuery) {
      displayedTasks = displayedTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    // Filter by status
    if (filterStatus) {
      displayedTasks = displayedTasks.filter((task) => task.status === filterStatus);
    }
  
    // Sort tasks
    displayedTasks = displayedTasks.sort((a, b) => {
      const isAsc = sortOrder === 'asc';
      const aValue = a[sortField] ?? ''; // Default to empty string if null or undefined
      const bValue = b[sortField] ?? ''; // Default to empty string if null or undefined
    
      if (aValue < bValue) return isAsc ? -1 : 1;
      if (aValue > bValue) return isAsc ? 1 : -1;
      return 0;
    });
  
    // Update filtered tasks state
    setFilteredTasks(displayedTasks);
  };
  
  
  const handleAddTask = async () => {
    const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
    const formattedDueDate = dueDate ? dueDate.toISOString().split('T')[0] : null;  

    validateAllFields(); // Ensure all fields are validated

    // Check if any errors exist after validation
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors || !newTitle || !newDescription || !assignedTo) {
      // Validate empty fields explicitly here for edge cases
      if (!newTitle) validateField('title', newTitle);
      if (!newDescription) validateField('description', newDescription);
      if (!assignedTo) validateField('assignedTo', assignedTo);
      return; // Stop submission if errors exist
    }

    // Log each piece of data to confirm
    console.log("Title:", newTitle);
    console.log("Description:", newDescription);
    console.log("Priority:", priority);
    console.log("Status:", status);
    console.log("Assigned To:", assignedTo);
    console.log("Start Date:", startDate);
    console.log("Due Date:", dueDate);
    console.log("Estimated Time:", estimatedTime);
    console.log("Time Spent:", timeSpent);
    console.log("Tags:", tags);
    console.log("Progress:", progress);
    console.log("Comments:", comments);
    console.log("Is Recurring:", isRecurring);
    console.log("Risk Level:", riskLevel);

    const newTask = {
      title: newTitle,
      description: newDescription,
      priority: priority || null,
      status: status || null,
      assignedTo: assignedTo || null,
      startDate: formattedStartDate, // Converted to string (YYYY-MM-DD)
      dueDate: formattedDueDate,      // Converted to string (YYYY-MM-DD)
      estimatedTime: estimatedTime || null,
      timeSpent: timeSpent || null,
      tags: tags || null,
      progress: progress || 0,
      comments: comments || null,
      isRecurring: isRecurring,       // Keep as boolean
      riskLevel: riskLevel || null
    };

    console.log("Payload sent to backend:", newTask); // Log for debugging

    await addTask(newTask); // Call addTask with formatted payload
    resetForm();
    fetchTasks();
  };

  
  const [dateError, setDateError] = useState<string | null>(null);

  const handleDateChange = (newStartDate: Date | null, newDueDate: Date | null) => {
    setStartDate(newStartDate);
    setDueDate(newDueDate);

    if (newStartDate && newDueDate && newStartDate > newDueDate) {
      setDateError('Start Date cannot be later than Due Date.');
    } else {
      setDateError(null);
    }
  };

  const resetForm = () => {
    setNewTitle('');
    setNewDescription('');
    setPriority('');
    setStatus('');
    setAssignedTo('');
    setStartDate(null);
    setDueDate(null);
    setEstimatedTime(0);
    setTimeSpent(0);
    setTags('');
    setProgress(0);
    setComments('');
    setIsRecurring(false);
    setRiskLevel('');
    setErrors({});
  };

  const openUpdateModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    if (updatedTask.id === undefined) {
      console.error("Task ID is undefined");
      return;
    }
  
    // Log the updatedTask object to confirm all fields are present
    console.log("Updating task with:", updatedTask);
  
    await updateTask(updatedTask.id, updatedTask);
    fetchTasks();
  };

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete.id!); // Assuming taskToDelete has an id
      fetchTasks();
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterStatusChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFilterStatus(e.target.value as string);
  };

  const handleSort = (field: keyof Task) => {
    const isAsc = sortField === field && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedTasks = filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


// Utility function to format date as mm/dd/yyyy
function formatDateToMMDDYYYY(date: Date | string | null | undefined): string {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  
  return `${month}/${day}/${year}`;
}


  return (
    
    <Box sx={{ padding: 2 }}>
     <h1>Task Tracker</h1>
     <h2>
        Follow my project progress on{' '}
        <Link 
          href="https://github.com/timmbacca/portfolioWorkMontgo" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          GitHub
        </Link>.
      </h2>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}>
      <TextField
          label="Task Title"
          value={newTitle}
          onChange={(e) => {
            setNewTitle(e.target.value);
            validateField('title', e.target.value);
          }}
          onBlur={() => validateField('title', newTitle)}
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="Task Description"
          value={newDescription}
          onChange={(e) => {
            setNewDescription(e.target.value);
            validateField('description', e.target.value);
          }}
          onBlur={() => validateField('description', newDescription)}
          multiline
          rows={3}
          error={!!errors.description}
          helperText={errors.description}
        />

        <FormControl fullWidth margin="dense">
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          labelId="priority-label"
          label="Priority"
          name="priority"
          value={priority || ''}
          onChange={(e) => setPriority(e.target.value)}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Urgent">Urgent</MenuItem>
        </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          label="Status"
          name="status"
          value={status || ''}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="On Hold">On Hold</MenuItem>
        </Select>
        </FormControl>

        <TextField
          label="Assigned To"
          value={assignedTo}
          onChange={(e) => {
            setAssignedTo(e.target.value);
            validateField('assignedTo', e.target.value);
          }}
          onBlur={() => validateField('assignedTo', assignedTo)}
          error={!!errors.assignedTo}
          helperText={errors.assignedTo}
        />

<LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    label="Start Date"
    value={startDate}
    onChange={(newValue) => handleDateChange(newValue, dueDate)}
    slotProps={{
      textField: {
        error: !!dateError,
        helperText: dateError || '',
      },
    }}
  />
  <DatePicker
    label="Due Date"
    value={dueDate}
    onChange={(newValue) => handleDateChange(startDate, newValue)}
    slotProps={{
      textField: {
        error: !!dateError,
        helperText: dateError || '',
      },
    }}
  />
</LocalizationProvider>


        <TextField label="Estimated Time (hours)" type="number" value={estimatedTime} onChange={(e) => setEstimatedTime(Number(e.target.value))} />
        <TextField label="Time Spent (hours)" type="number" value={timeSpent} onChange={(e) => setTimeSpent(Number(e.target.value))} />

        <TextField label="Tags" value={tags} onChange={(e) => setTags(e.target.value)} />

        <FormControl fullWidth margin="dense">
        <Typography gutterBottom>Progress: {progress}%</Typography>
        <Slider
          value={progress}
          onChange={(e, newValue) => setProgress(newValue as number)}
          aria-labelledby="progress-slider"
          min={0}
          max={100}
          step={5} // Move in 5% increments
        />
        </FormControl>

        <TextField label="Comments" value={comments} onChange={(e) => setComments(e.target.value)} multiline rows={2} />

        <FormGroup>
          <FormControlLabel control={<Checkbox checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} />} label="Recurring Task" />
        </FormGroup>

        <FormControl fullWidth margin="dense">
        <InputLabel id="risk-level-label">Risk Level</InputLabel>
        <Select
          labelId="risk-level-label"
          label="Risk Level"
          name="riskLevel"
          value={riskLevel || ''}
          onChange={(e) => setRiskLevel(e.target.value)}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
        </FormControl>
        {errors.dates && <Typography color="error">{errors.dates}</Typography>}
        <Button onClick={handleAddTask} variant="contained" color="primary">Add Task</Button>
      </Box>

      <Box sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>

      <Box     sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
        <TextField
          label="Search by Title or Description"
          variant="outlined"
          fullWidth
          margin="dense"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            maxWidth: 600, // Limit the width on larger screens
            width: '100%', // Make it responsive to smaller screens
            '& .MuiOutlinedInput-root': {
              color: 'text.primary',
            },
            '& .MuiInputLabel-root': {
              color: 'text.secondary',
            },
            backgroundColor: 'background.default',
            boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.2)', // Subtle shadow
          }}
        />
      </Box>

  <TableContainer component={Paper}
  sx={{
    marginTop: 4,
    overflowX: 'auto',
    '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#444444',
            },
            boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.2)', // cool timmy shadow
  }}
  >

  <Table aria-label="task table" sx={{ minWidth: 650 }}>
    <TableHead>
      <TableRow>
        {[
          { label: 'Title', field: 'title' },
          { label: 'Description', field: 'description' },
          { label: 'Priority', field: 'priority' },
          { label: 'Status', field: 'status' },
          { label: 'Assigned To', field: 'assignedTo' },
          { label: 'Start Date', field: 'startDate' },
          { label: 'Due Date', field: 'dueDate' },
          { label: 'Estimated Time (hrs)', field: 'estimatedTime' },
          { label: 'Time Spent (hrs)', field: 'timeSpent' },
          { label: 'Tags', field: 'tags' },
          { label: 'Progress (%)', field: 'progress' },
          { label: 'Comments', field: 'comments' },
          { label: 'Recurring', field: 'isRecurring' },
          { label: 'Risk Level', field: 'riskLevel' },
          { label: 'Actions', field: 'actions' },
        ].map((col) => (
          <TableCell
            key={col.field}
            sortDirection={sortField === col.field ? sortOrder : false}
          >
            <TableSortLabel
              active={sortField === col.field}
              direction={sortField === col.field ? sortOrder : 'asc'}
              onClick={() => handleSort(col.field as keyof Task)}
            >
              {col.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
    {paginatedTasks.map((task: Task) => (
        <TableRow key={task.id}>
          <TableCell>{task.title || '—'}</TableCell>
          <TableCell>{task.description || '—'}</TableCell>
          <TableCell>{task.priority || '—'}</TableCell>
          <TableCell>{task.status || '—'}</TableCell>
          <TableCell>{task.assignedTo || '—'}</TableCell>
          <TableCell>{task.startDate ? formatDateToMMDDYYYY(task.startDate) : '—'}</TableCell>
          <TableCell>{task.dueDate ? formatDateToMMDDYYYY(task.dueDate) : '—'}</TableCell>
          <TableCell>{task.estimatedTime != null ? task.estimatedTime : '—'}</TableCell>
          <TableCell>{task.timeSpent != null ? task.timeSpent : '—'}</TableCell>
          <TableCell>{task.tags || '—'}</TableCell>
          <TableCell>{task.progress != null ? `${task.progress}%` : '—'}</TableCell>
          <TableCell>{task.comments || '—'}</TableCell>
          <TableCell>{task.isRecurring ? 'Yes' : 'No'}</TableCell>
          <TableCell>{task.riskLevel || '—'}</TableCell>
          <TableCell>
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      gap: 1, // Adds space between the buttons
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Button
      variant="contained"
      color="primary"
      onClick={() => openUpdateModal(task)}
      sx={{
        width: { xs: '100%', sm: 'auto' }, // Full width on mobile, auto on larger screens
        mb: { xs: 1, sm: 0 }, // Adds margin at the bottom for mobile
      }}
    >
      Update
    </Button>
    <Button
      variant="contained"
      color="secondary"
      onClick={() => handleDeleteClick(task)}
      sx={{
        width: { xs: '100%', sm: 'auto' }, // Full width on mobile, auto on larger screens
      }}
    >
      Delete
    </Button>
  </Box>
</TableCell>

        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

<TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={filteredTasks.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>


      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        taskTitle={taskToDelete?.title || ''}
      />

      {selectedTask && (
        <TaskUpdateModal
          open={isModalOpen}
          onClose={closeUpdateModal}
          onSubmit={handleUpdateTask}
          task={selectedTask}
        />
      )}
    </Box>
    </Box>
  );
};

export default TaskTrackerPage;
