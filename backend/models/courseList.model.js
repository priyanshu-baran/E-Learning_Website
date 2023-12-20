import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    coursename: {
      type: String,
      unique: true,
    },
    firstcontent: {
      type: String,
    },
    secondcontent: {
      type: String,
    },
    thirdcontent: {
      type: String,
    },
    fourthcontent: {
      type: String,
    },
    fifthcontent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;
