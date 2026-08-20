const mongoose = require('mongoose');

// Doctor Schema definition according to Task 5 requirements
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    specialisation: {
      type: String,
      required: [true, 'Specialisation is required'],
      trim: true
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
