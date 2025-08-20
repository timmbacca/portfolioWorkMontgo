import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import taskRoutes from './tasks/taskRoutes';
import chatRoutes from './chat/chatRoutes';
import { pool } from './db'; // Import the pool

const app = express();
// Cloud Run provides the PORT environment variable
const PORT = process.env.PORT || 8081;

// --- START: MORE ROBUST CORS CONFIGURATION ---

const allowedOrigins = ['https://www.tmontgo.com', 'https://tmontgo.com'];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // The 'origin' can be undefined for server-to-server requests or REST tools.
    // We allow these, and we allow any origin in our whitelist.
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed by the CORS policy.'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Use the CORS middleware
app.use(cors(corsOptions));

// --- END: MORE ROBUST CORS CONFIGURATION ---

app.use(express.json());
app.use('/tasks', taskRoutes);
app.use('/chat', chatRoutes); // Use chat routes

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

const startServer = async () => {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database');
    client.release();

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database.', error);
    process.exit(1);
  }
};

startServer();
