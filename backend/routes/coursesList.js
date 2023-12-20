import express from 'express';
const router = express.Router();

import Course from '../models/courseList.model.js';

router.route('/').get((_, res) => {
  Course.find()
    .then((course) => res.json(course))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// router.route('/:username').get(async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.params.username });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

router.route('/add').post(async (req, res) => {
  const {
    coursename,
    firstcontent,
    secondcontent,
    thirdcontent,
    fourthcontent,
    fifthcontent,
  } = req.body;
  const newCourse = new Course({
    coursename,
    firstcontent,
    secondcontent,
    thirdcontent,
    fourthcontent,
    fifthcontent,
  });
  newCourse
    .save()
    .then(() => res.json('New Course Added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// router.route('/add/favoritecourses').post((req, res) => {});

export default router;
