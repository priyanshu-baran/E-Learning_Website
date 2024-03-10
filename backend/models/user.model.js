import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    country: {
      name: {
        type: String,
      },
      code: {
        type: String,
      },
    },
    favoriteCourses: {
      type: [String],
    },
    paymentStatus: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    person: {
      firstname: {
        type: String,
      },
      lastname: {
        type: String,
      },
      profilepic: {
        type: String,
      },
      bio: {
        type: String,
      },
    },
    socialLinks: {
      linkedin: {
        type: String,
      },
      instagram: {
        type: String,
      },
      github: {
        type: String,
      },
      twitter: {
        type: String,
      },
      facebook: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
