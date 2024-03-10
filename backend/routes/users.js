import express from 'express';
const router = express.Router();

import User from '../models/user.model.js';

router.route('/').get(async (req, res) => {
  try {
    const { size } = req.query;
    let users;
    if (size === 'small') {
      users = await User.find().limit(10);
    } else if (size === 'medium') {
      users = await User.find().limit(50);
    } else if (size === 'large') {
      users = await User.find().limit(200);
    } else {
      users = await User.find();
    }
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  // User.find()
  //   .then((users) => res.json(users))
  //   .catch((err) => res.status(400).json('Error: ' + err));
});

router
  .route('/:email')
  .get(async (req, res) => {
    try {
      const email = await User.findOne({ email: req.params.email });
      if (!email) {
        return res.status(404).json({ error: 'Email ID not found' });
      }
      res.json(email);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedUser = await User.findOneAndDelete({
        email: req.params.email,
      });
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found for deletion' });
      }
      res.json({ message: 'User deleted successfully', deletedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error during deletion' });
    }
  });

router.route('/add').post(async (req, res) => {
  const {
    username,
    email,
    country,
    favoriteCourses,
    paymentStatus,
    verified,
    person,
    socialLinks,
  } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      if (username !== undefined) existingUser.username = username;
      if (country !== undefined) existingUser.country = country;
      if (favoriteCourses !== undefined)
        existingUser.favoriteCourses = favoriteCourses;
      if (paymentStatus !== undefined)
        existingUser.paymentStatus = paymentStatus;
      if (verified !== undefined) existingUser.verified = verified;
      if (person !== undefined) existingUser.person = person;
      if (socialLinks !== undefined) existingUser.socialLinks = socialLinks;
      await existingUser.save();
      res.json('User profile updated!');
    } else {
      const newUser = new User({ email });
      if (username !== undefined) newUser.username = username;
      if (country !== undefined) newUser.country = country;
      if (favoriteCourses !== undefined)
        newUser.favoriteCourses = favoriteCourses;
      if (paymentStatus !== undefined) newUser.paymentStatus = paymentStatus;
      if (verified !== undefined) newUser.verified = verified;
      if (person !== undefined) newUser.person = person;
      if (socialLinks !== undefined) newUser.socialLinks = socialLinks;
      await newUser.save();
      res.json('New user created!');
    }
  } catch (err) {
    res.status(400).json('Error: ' + err.message);
  }
});

export default router;
