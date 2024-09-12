const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET; 
// Register user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, password: hashedPassword });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Attempting login for:', username); // Debugging line

  try {
    const user = await User.findOne({ username });
    console.log('User found:', user); // Debugging line
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    console.log('Comparing passwords:', password, user.password); // Debugging line
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); // Debugging line
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.log('Error:', err); // Debugging line
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
