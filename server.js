const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PORT } = require('./PORT');
const app = express();


// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define the root route ('/')
app.get('/', (req, res) => {
  res.send('Welcome to your backend!');
});

// Routes
app.use('/api/classes', require('./routes/classes'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
