const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const tasksRoute = require('./routes/tasks');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/tasks', tasksRoute);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/res', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
