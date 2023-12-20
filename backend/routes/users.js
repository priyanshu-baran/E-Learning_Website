import express from 'express';
const router = express.Router();

import User from '../models/user.model.js';

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:email').get(async (req, res) => {
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
});

router.route('/add').post(async (req, res) => {
  const {
    username,
    bio,
    profilepic,
    firstname,
    lastname,
    email,
    linkedin,
    instagram,
    github,
    twitter,
    facebook,
  } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      // Update only the fields that are provided in the request
      if (username !== undefined) existingUser.username = username;
      if (bio !== undefined) existingUser.bio = bio;
      if (profilepic !== undefined) existingUser.profilepic = profilepic;
      if (firstname !== undefined) existingUser.firstname = firstname;
      if (lastname !== undefined) existingUser.lastname = lastname;
      if (linkedin !== undefined) existingUser.linkedin = linkedin;
      if (instagram !== undefined) existingUser.instagram = instagram;
      if (github !== undefined) existingUser.github = github;
      if (twitter !== undefined) existingUser.twitter = twitter;
      if (facebook !== undefined) existingUser.facebook = facebook;
      await existingUser.save();
      res.json('User profile updated!');
    } else {
      // Create a new user with only the email field
      const newUser = new User({ email });
      // Set other fields if provided
      if (username !== undefined) newUser.username = username;
      if (bio !== undefined) newUser.bio = bio;
      if (profilepic !== undefined) newUser.profilepic = profilepic;
      if (firstname !== undefined) newUser.firstname = firstname;
      if (lastname !== undefined) newUser.lastname = lastname;
      if (linkedin !== undefined) newUser.linkedin = linkedin;
      if (instagram !== undefined) newUser.instagram = instagram;
      if (github !== undefined) newUser.github = github;
      if (twitter !== undefined) newUser.twitter = twitter;
      if (facebook !== undefined) newUser.facebook = facebook;
      await newUser.save();
      res.json('New user created!');
    }
  } catch (err) {
    res.status(400).json('Error: ' + err.message);
  }
});

export default router;
