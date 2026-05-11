const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks or tasks for a specific chef
router.get('/', async (req, res) => {
    try {
        const chef = req.query.chef;
        const tasks = chef ? await Task.find({ chef }) : await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new task
router.post('/', async (req, res) => {
    const { name, status, chef } = req.body;
    const newTask = new Task({ name, status, chef });
    try {
        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update task details
router.put('/:id', async (req, res) => {
    try {
        const { name, status, chef } = req.body;
        const task = await Task.findByIdAndUpdate(req.params.id, { name, status, chef }, { new: true });
        res.json(task);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;