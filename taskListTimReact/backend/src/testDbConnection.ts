import { pool } from './db'; // Use named import instead of a default import

const testConnection = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks');
    console.log('Connection successful, tasks:', rows);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    pool.end();
  }
};

testConnection();
