const express = require('express');
const { check, validationResult } = require('express-validator');
const Class = require('../models/Class');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all classes in a city
router.get('/', async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }

    const classes = await Class.find({ city });
    if (classes.length === 0) {
      return res.status(404).json({ message: 'No classes found in this city' });
    }

    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: `Error fetching classes: ${err.message}` });
  }
});

// Add a new class
router.post(
  '/',
  auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('subjects', 'At least one subject is required').isArray({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, address, city, subjects, contact_info, youtube, userRatings, averageRating } = req.body;

      const newClass = new Class({
        name,
        address,
        city,
        subjects,
        contact_info,
        youtube,
        userRatings,
        averageRating,
      });

      await newClass.save();
      res.status(201).json(newClass);
    } catch (err) {
      res.status(500).json({ message: `Error adding class: ${err.message}` });
    }
  }
);

// Delete a class
router.delete('/:id', auth, async (req, res) => {
  try {
    const classToDelete = await Class.findById(req.params.id);
    if (!classToDelete) {
      return res.status(404).json({ message: 'Class not found' });
    }

    await classToDelete.remove();
    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: `Error deleting class: ${err.message}` });
  }
});

// Submit a user rating
router.post(
  '/:id/rate',
  auth,
  [
    check('rating', 'Rating is required and should be a number between 1 and 5').isFloat({ min: 1, max: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { rating } = req.body;

      const coachingClass = await Class.findById(req.params.id);
      if (!coachingClass) {
        return res.status(404).json({ message: 'Class not found' });
      }

      coachingClass.userRatings.push(rating);
      coachingClass.averageRating = coachingClass.calculateAverageRating();
      await coachingClass.save();

      res.json({ averageRating: coachingClass.averageRating });
    } catch (err) {
      res.status(500).json({ message: `Error submitting rating: ${err.message}` });
    }
  }
);

module.exports = router;
