const mongoose = require('mongoose');

// Appointment Schema definition according to Task 5 requirements
const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Patient reference (patientId) is required']
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: [true, 'Doctor reference (doctorId) is required']
    },
    date: {
      type: String,
      required: [true, 'Appointment date is required']
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
      trim: true
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'confirmed', 'cancelled'],
        message: '{VALUE} is not a valid status. Allowed: pending, confirmed, cancelled'
      },
      default: 'pending'
    },
    reason: {
      type: String,
      maxlength: [300, 'Reason cannot exceed 300 characters'],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
