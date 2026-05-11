const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: String,
    status: String,
    chef: String,
});

module.exports = mongoose.model('Task', TaskSchema);
