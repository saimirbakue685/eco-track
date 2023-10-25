/* 
   Filename: complexWebApp.js 
   Description: This is a complex web application that includes multiple functionalities.
*/

// Import required libraries
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create an instance of Express
const app = express();

// Set up MongoDB database connection
const dbUrl = 'mongodb://localhost/mydb';
mongoose.connect(dbUrl, { useNewUrlParser: true });
const db = mongoose.connection;

// Define MongoDB Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});
const User = mongoose.model('User', userSchema);

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle GET requests for /users endpoint
app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(users);
    }
  });
});

// Handle POST requests for /users endpoint
app.post('/users', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email
  });
  newUser.save((err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to create user' });
    } else {
      res.status(201).json(newUser);
    }
  });
});

// Define custom middleware to log request details
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Start listening on a specific port
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Define helper functions
function helloWorld() {
  return 'Hello, world!';
}

function addNumbers(a, b) {
  return a + b;
}

// Export helper functions
module.exports = {
  helloWorld,
  addNumbers
};