const express = require('express'); // Module to create server
const bodyParser = require('body-parser'); // JSON request to JS object
const cors = require('cors'); // Enables requesting from other domains
const { Pool } = require('pg'); // Module to connect to PostgreSQL

const app = express(); // Server-side and Node.js framework
const port = 5004; // Changed port number

app.use(cors()); // Enable CORS - other domains can request
app.use(bodyParser.json()); // Parse JSON requests

const pool = new Pool({ // Connection to PostgreSQL
  user: 'postgres', // Default username
  host: 'localhost', // Default host
  database: 'Platz', // Database name
  password: '1907!Firma',
  port: 5432, // Default port
});

// Endpoint to register a new user
app.post('/register', async (req, res) => {
  const { fullName, phoneNumber, email, password, appName } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (full_name, phone_number, email, password, app_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [fullName, phoneNumber, email, password, appName]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error.stack);
    if (error.code === '23505') {
      res.status(400).json({ message: 'Email or App Name already exists' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});

// Endpoint to log in a user
app.post('/login', async (req, res) => {
  const { appName, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE app_name = $1 AND password = $2',
      [appName, password]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ message: `Welcome ${appName}` });
    } else {
      res.status(401).json({ message: 'Please check your App Name and Password' });
    }
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to make a reservation
app.post('/reserve', async (req, res) => {
  const { appName, date, fromTime, toTime } = req.body;

  try {
    // Check the current number of reservations for the selected time period
    const result = await pool.query(
      'SELECT COUNT(*) FROM reservations WHERE date = $1 AND ((from_time <= $2 AND to_time > $2) OR (from_time < $3 AND to_time >= $3) OR (from_time >= $2 AND to_time <= $3))',
      [date, fromTime, toTime]
    );
    const currentReservations = parseInt(result.rows[0].count, 10);

    // Define the maximum capacity
    const maxCapacity = 10;

    // Check if the current number of reservations is less than the capacity
    if (currentReservations < maxCapacity) {
      // Insert the reservation into the database
      const insertResult = await pool.query(
        'INSERT INTO reservations (app_name, date, from_time, to_time) VALUES ($1, $2, $3, $4) RETURNING *',
        [appName, date, fromTime, toTime]
      );
      res.status(201).json(insertResult.rows[0]);
    } else {
      res.status(400).json({ message: 'Parking lot is full for the selected time period' });
    }
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the backend server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});