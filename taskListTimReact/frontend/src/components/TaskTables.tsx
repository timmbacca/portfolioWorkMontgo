import React, { useEffect, useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import TaskUpdateModal from './TaskUpdateModal';
import {
  TextField, Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, Paper, TablePagination,
  Link
} from '@mui/material';
import { getTasks, updateTask, deleteTask, Task } from '../api/taskApi';

interface TaskTableProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  }

  const TaskTable: React.FC<TaskTableProps> = ({ tasks, setTasks }) => {
      const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
      const [searchQuery, setSearchQuery] = useState('');
      const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
      const [sortField, setSortField] = useState<keyof Task>('title');
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
      const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
      const [selectedTask, setSelectedTask] = useState<Task | null>(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
      
        useEffect(() => {
            applyFilters();
          }, [tasks, searchQuery, sortOrder, sortField]);

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
    <Box sx={{ marginTop: 4 }}>
    <Typography component="div" variant="h4" gutterBottom>
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
  );
};

export default TaskTable;
