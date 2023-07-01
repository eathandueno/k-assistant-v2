const express = require('express');
const router = express.Router();
const Habit = require('../models/habit.model');

// Create a habit
router.post('/', async (req, res) => {
  try {
    const habit = await Habit.create(req.body);
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create habit' });
  }
});

// Read all habits
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch habits' });
  }
});

// Read a habit by ID
router.get('/:id', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      res.status(404).json({ error: 'Habit not found' });
    } else {
      res.json(habit);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch habit' });
  }
});

// Update a habit
router.put('/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!habit) {
      res.status(404).json({ error: 'Habit not found' });
    } else {
      res.json(habit);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update habit' });
  }
});

// Delete a habit
router.delete('/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) {
      res.status(404).json({ error: 'Habit not found' });
    } else {
      res.json({ message: 'Habit deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete habit' });
  }
});

module.exports = router;
