const express = require('express');
const router = express.Router();
const Device = require('../models/device.model');

// Create a device
router.post('/', async (req, res) => {
  try {
    const device = await Device.create(req.body);
    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create device' });
  }
});

// Read all devices
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch devices' });
  }
});

// Read a device by ID
router.get('/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) {
      res.status(404).json({ error: 'Device not found' });
    } else {
      res.json(device);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch device' });
  }
});

// Update a device
router.put('/:id', async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!device) {
      res.status(404).json({ error: 'Device not found' });
    } else {
      res.json(device);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update device' });
  }
});

// Delete a device
router.delete('/:id', async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.id);
    if (!device) {
      res.status(404).json({ error: 'Device not found' });
    } else {
      res.json({ message: 'Device deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete device' });
  }
});

module.exports = router;
