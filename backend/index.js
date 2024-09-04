const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Employeemodel = require('./model/Employee');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/employeetable", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Default Route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// POST Route for Creating Employees
app.post("/employeename", (req, res) => {
  console.log('Received data:', req.body); // Log the received data
  Employeemodel.create(req.body)
    .then(employee => {
      res.status(201).json({ message: 'Employee created successfully', data: employee });
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create employee', error: err.message });
    });
});

// Start Server
const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
