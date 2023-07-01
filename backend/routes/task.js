const express = require('express');
const router = express.Router();
const Task = require('../models/task.model');

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { user, title, description, dueDate, completed, priority } = req.body;
    const task = new Task({
      user,
      title,
      description,
      dueDate,
      completed,
      priority,
    });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new task' });
  }
});

// Read all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Read a task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json(task);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the task' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { username, title, description, dueDate, completed, priority } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        username,
        title,
        description,
        dueDate,
        completed,
        priority,
      },
      { new: true }
    );
    if (!updatedTask) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json(updatedTask);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the task' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json({ message: 'Task deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the task' });
  }
});

// Find tasks by priority
router.get('/priority/:priority', async (req, res) => {
    try {
      const tasks = await Task.find({ priority: req.params.priority });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks by priority' });
    }
  });
  
  // Find tasks by title
  router.get('/title/:title', async (req, res) => {
    try {
      const tasks = await Task.find({ title: req.params.title });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks by title' });
    }
  });
  
  // Find tasks by due date
  router.get('/due-date/:dueDate', async (req, res) => {
    try {
      const tasks = await Task.find({ dueDate: req.params.dueDate });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks by due date' });
    }
  });
module.exports = router;
