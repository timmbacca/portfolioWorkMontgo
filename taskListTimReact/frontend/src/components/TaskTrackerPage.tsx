import React, { useEffect, useState } from 'react';
import Papa from 'papaparse'; // For CSV parsing
import {
  TextField, Select, MenuItem, Button, FormControl, InputLabel, FormGroup,
  FormControlLabel, Checkbox, Slider, Typography, Box, Link
} from '@mui/material';
import HowItsMade from '../components/HowItsMade';
import TaskTable from '../components/TaskTables';
import { validateInput } from '../utils/validation';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getTasks, addTask, updateTask, Task } from '../api/taskApi';

const TaskTrackerPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [file, setFile] = useState<File | null>(null);
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
      startDate: startDate ? startDate.toISOString().split('T')[0] : null,
      dueDate: dueDate ? dueDate.toISOString().split('T')[0] : null,
      estimatedTime: estimatedTime || null,
      timeSpent: timeSpent || null,
      tags: tags || null,
      progress: progress || 0,
      comments: comments || null,
      isRecurring: isRecurring,
      riskLevel: riskLevel || null,
    };

    /* console.log("Payload sent to backend:", newTask); // Log for debugging

    await addTask(newTask); // Call addTask with formatted payload
    resetForm();
    fetchTasks(); */

    try {
      const createdTask = await addTask(newTask);
      
      // Update state immediately to include the new task
      setTasks((prevTasks) => [...prevTasks, createdTask]);
  
      // Optionally, refresh the task list to stay in sync with the backend
      resetForm();
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
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

  return (
    
    <Box sx={{ padding: 2 }}>
     <h1>Task Tracker</h1>
     <HowItsMade />
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
  <Typography id="add-task-progress-slider-label" gutterBottom>
    Progress: {progress}%
  </Typography>
  <Slider
    value={progress}
    onChange={(e, newValue) => setProgress(newValue as number)}
    aria-labelledby="add-task-progress-slider-label"
    aria-valuetext={`${progress}%`}
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
<Typography component="div" variant="h6" sx={{ marginBottom: 2, color: 'primary.main' }}>
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

<TaskTable tasks={tasks} setTasks={setTasks} />
    </Box>
  );
};

export default TaskTrackerPage;
