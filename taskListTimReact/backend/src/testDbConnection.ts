import { pool } from './db'; // Use named import from the updated db.ts file

const testConnection = async () => {
  try {
    const result = await pool.query('SELECT * FROM tasks'); // Use `query` for PostgreSQL
    console.log('Connection successful, tasks:', result.rows); // Access the `rows` property for the data
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await pool.end(); // Use `await` to properly close the connection pool
  }
};

testConnection();
