const router = require('express').Router();

const UserProfile = require('../models/user.model');
const bcrypt = require('bcrypt');

// Create a user profile
router.post('/', async (req, res) => {
  try {
    const { name, email, password, preferences, healthConditions } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userProfile = new UserProfile({
      name,
      email,
      password: hashedPassword,
      preferences,
      healthConditions,
    });
    userProfile.save()
      .then(() => res.json('User Added!'))
      .catch(err => res.status(400).json("Error: " + err))
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user profile' });
  }
});

// Read all user profiles
router.get('/', async (req, res) => {
  try {
    const userProfiles = await UserProfile.find();
    res.json(userProfiles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profiles' });
  }
});

// Read a user profile by ID
router.get('/:id', async (req, res) => {
  try {
    const userProfile = await UserProfile.findById(req.params.id);
    if (!userProfile) {
      res.status(404).json({ error: 'User profile not found' });
    } else {
      res.json(userProfile);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Update a user profile
router.put('/:id', async (req, res) => {
  try {
    const { name, email, preferences, healthConditions } = req.body;

    // Check if the user wants to update the password
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }

    const userProfile = await UserProfile.findByIdAndUpdate(
      req.params.id,
      { name, email, preferences, healthConditions },
      { new: true }
    );
    if (!userProfile) {
      res.status(404).json({ error: 'User profile not found' });
    } else {
      res.json(userProfile);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// Delete a user profile
router.delete('/:id', async (req, res) => {
  try {
    const userProfile = await UserProfile.findByIdAndDelete(req.params.id);
    if (!userProfile) {
      res.status(404).json({ error: 'User profile not found' });
    } else {
      res.json({ message: 'User profile deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user profile' });
  }
});

module.exports = router;
