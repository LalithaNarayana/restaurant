// res/back/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const tasksRoute = require('./routes/tasks');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/tasks', tasksRoute);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

module.exports = app; // ← export for Vercel