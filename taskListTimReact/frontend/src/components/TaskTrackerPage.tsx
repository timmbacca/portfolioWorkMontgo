// frontend/src/components/TaskList.tsx

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse'; // For CSV parsing
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
  const [file, setFile] = useState<File | null>(null);
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

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Process CSV file
  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a CSV file first.');
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const rows = results.data as Partial<Task>[];

        if (rows.length > 20) {
          alert('Only the first 20 rows will be processed.');
        }

        let addedCount = 0;

        for (const row of rows.slice(0, 20)) {
          if (tasks.length + addedCount >= 100) {
            alert('Task limit of 100 reached. Not all rows could be added.');
            break;
          }

          const newTask: Task = {
            title: row.title || 'Untitled Task',
            description: row.description || '',
            priority: row.priority || 'Low',
            status: row.status || 'To Do',
            assignedTo: row.assignedTo || '',
            startDate: row.startDate || null,
            dueDate: row.dueDate || null,
            estimatedTime: Number(row.estimatedTime) || null,
            timeSpent: Number(row.timeSpent) || null,
            tags: row.tags || '',
            progress: Number(row.progress) || 0,
            comments: row.comments || '',
            isRecurring: Boolean(row.isRecurring) || false,
            riskLevel: row.riskLevel || 'Low',
          };

          try {
            await addTask(newTask);
            addedCount++;
          } catch (error) {
            console.error('Error adding task:', error);
          }
        }

        alert(`Successfully added ${addedCount} tasks.`);
        fetchTasks(); // Refresh tasks
        setFile(null); // Clear file input
      },
    });
  };

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
        ['title', 'description', 'priority', 'status', 'assignedTo', 'tags', 'comments', 'riskLevel']
          .some((field) =>
            (task[field as keyof Task] || '') // Ensure the field exists
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
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

    // Validate estimated time
    if (estimatedTime < 0) {
      alert('Estimated Time cannot be negative.');
      return;
    }
    if (!Number.isInteger(estimatedTime)) {
      alert('Estimated Time must be a whole number.');
      return;
    }

    // Validate spent time
    if (timeSpent < 0) {
      alert('Spent Time cannot be negative.');
      return;
    }
    if (!Number.isInteger(timeSpent)) {
      alert('Spent Time must be a whole number.');
      return;
    }

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
      <Box sx={{ backgroundColor: 'background.default', boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.2)', padding: '15px', borderRadius: '8px' }}>
  <h2>
    How It's Put Together
  </h2>
  <ul style={{ listStyleType: 'disc', margin: 'auto', lineHeight: '1.5', textAlign:'justify', width:'90%', marginBottom:'10px', paddingInlineStart: '0px' }}>
    <li style={{ marginBottom: '10px' }}>
            <strong>Frontend:</strong> Built using <strong>React</strong> with <strong>TypeScript</strong> and styled
            with <strong>Material-UI</strong> for a responsive, modern design. Features modular components for task
            management and form validations.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Backend:</strong> Developed with <strong>Node.js</strong> and <strong>Express.js</strong>, using
            <strong>TypeScript</strong> for type safety. Provides RESTful endpoints for managing tasks, with robust
            validation and error handling.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Database:</strong> Powered by <strong>PostgreSQL</strong>, hosted on Render. Includes a
            well-structured schema for tasks, with default values and constraints, and uses parameterized queries for
            security.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>API Setup:</strong> Integrates the frontend and backend via <strong>Axios</strong>, dynamically
            configured with environment variables for seamless deployment.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Docker:</strong> Utilizes multi-stage Dockerfiles for both frontend and backend. The frontend is
            built and served using Nginx, while the backend compiles TypeScript and runs the server.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Git:</strong> Hosted on <strong>GitHub</strong> with branches for feature development and
            production-ready code. Regular, meaningful commits track progress and maintain project stability.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Render Deployment:</strong> Frontend, backend, and PostgreSQL database are deployed on{' '}
            <strong>Render</strong>, with environment variables securely managing configurations for cross-service
            communication.
          </li>
  </ul>
</Box>
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
      <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
        <Typography variant="body2" color="textSecondary">
          {tasks.length}/100 tasks created
        </Typography>
      </Box>
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


        <TextField
          label="Estimated Time (hours)"
          type="number"
          value={estimatedTime}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setEstimatedTime(isNaN(value) ? 0 : value);
          }}
          inputProps={{ min: 0, step: 1 }} 
          helperText="Enter a whole number (hours only)."
        />
        <TextField 
          label="Time Spent (hours)" 
          type="number" 
          value={timeSpent}  
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setTimeSpent(isNaN(value) ? 0 : value); 
          }}
          inputProps={{ min: 0, step: 1 }}
          helperText="Enter a whole number (hours only)."
        />

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

{/* File Upload Section */}
<Box
  sx={{
    marginTop: 6,
    marginBottom: 2,
    padding: 2,
    border: '2px dashed',
    borderColor: 'divider',
    borderRadius: '8px',
    textAlign: 'center',
    maxWidth: 400, // Matches the width of the Add Task section
    marginX: 'auto', // Centers the box
    backgroundColor: 'background.paper',
    boxShadow: 1, // Subtle shadow using MUI theme
  }}
>
  <Typography variant="h6" sx={{ marginBottom: 2, color: 'primary.main' }}>
    Bulk Upload Tasks (CSV)
  </Typography>

  {/* File Input and Styled Upload Button */}
  <label htmlFor="csv-upload">
    <input
      id="csv-upload"
      type="file"
      accept=".csv"
      onChange={handleFileChange}
      style={{ display: 'none' }} // Hide the default file input
    />
    <Button
      variant="outlined"
      component="span"
      sx={{
        width: '100%', // Match the button size to the box
      }}
    >
      Choose File
    </Button>
  </label>

  <Button
    variant="contained"
    color="primary"
    onClick={handleFileUpload}
    sx={{ marginTop: 2, width: '100%' }} // Full width for symmetry
  >
    Upload CSV
  </Button>

  {/* Download Sample CSV Link */}
  <Box sx={{ marginTop: 2 }}>
    <Typography variant="body2" sx={{ textAlign: 'center' }}>
      Need a sample?{' '}
      <Link
        href="/sample-tasks.csv"
        download="sample-tasks.csv"
        sx={{ fontWeight: 'bold', textDecoration: 'underline' }}
      >
        Download Sample CSV
      </Link>
    </Typography>
  </Box>
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
      top: 40,
      zIndex: 10,
    }}>
        <TextField
          label="Search by Title, Description, or Other Fields"
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
