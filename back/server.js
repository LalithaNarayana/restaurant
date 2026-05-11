const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const tasksRoute = require('./routes/tasks');

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use('/tasks', tasksRoute);

// Cache connection across serverless calls
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
};

app.use(async (req, res, next) => {
    await connectDB();
    next();
});

module.exports = app;