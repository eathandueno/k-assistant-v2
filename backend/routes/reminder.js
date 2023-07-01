const express = require('express');
const router = express.Router();
const Reminder = require('../models/reminder.model');

// Create a new reminder
router.post('/', async (req, res) => {
  try {
    const { userId, reminderType, reminderMessage, reminderTime } = req.body;
    const reminder = await Reminder.create({
      userId,
      reminderType,
      reminderMessage,
      reminderTime,
    });
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new reminder' });
  }
});

// Read all reminders
router.get('/', async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reminders' });
  }
});

// Read a reminder by ID
router.get('/:id', async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      res.status(404).json({ error: 'Reminder not found' });
    } else {
      res.json(reminder);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the reminder' });
  }
});

// Update a reminder
router.put('/:id', async (req, res) => {
  try {
    const { userId, reminderType, reminderMessage, reminderTime } = req.body;
    const reminder = await Reminder.findByIdAndUpdate(
      req.params.id,
      {
        userId,
        reminderType,
        reminderMessage,
        reminderTime,
      },
      { new: true }
    );
    if (!reminder) {
      res.status(404).json({ error: 'Reminder not found' });
    } else {
      res.json(reminder);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the reminder' });
  }
});

// Delete a reminder
router.delete('/:id', async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndDelete(req.params.id);
    if (!reminder) {
      res.status(404).json({ error: 'Reminder not found' });
    } else {
      res.json({ message: 'Reminder deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the reminder' });
  }
});

module.exports = router;
