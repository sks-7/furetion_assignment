// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connection } = require('./dbConnection/db');
const { ticketController } = require('./controllers/TicketsController');
const {
  reservationController,
} = require('./controllers/ReservationController');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// end points

app.use('/api/tickets', ticketController);
app.use('/api/reservations', reservationController);

// staring server

app.get('/', (req, res) => {
  res.send("welcome")
});

// Start the server
const port = 8080;
app.listen(port, async () => {
  console.log(`server is running on port ${port}`);

  await connection();

  console.log('connected to database');
});
