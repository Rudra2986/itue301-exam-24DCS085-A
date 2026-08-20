const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import Mongoose Models (Task 5)
const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hospital_db';

// ==========================================
// MIDDLEWARES
// ==========================================

// Built-in body parsing middleware (PR 4)
app.use(express.json());

// Enable CORS for frontend communication (PR 3 & PR 4)
app.use(cors());

/**
 * Task 3: Custom requestLogger Middleware
 * Logs every incoming HTTP request in format: [METHOD] [PATH] [TIMESTAMP]
 * Example: [GET] /api/v1/appointments [2026-08-20T10:15:20.000Z]
 */
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.originalUrl || req.url} [${timestamp}]`);
  next();
};

// Apply request logger globally
app.use(requestLogger);

// ==========================================
// IN-MEMORY DATA STORAGE (Task 3 & Task 4)
// ==========================================

// Hardcoded initial doctors list (Task 3 / Task 4)
let inMemoryDoctors = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@medcareplus.com',
    specialisation: 'Cardiology',
    available: true
  },
  {
    id: 'doc-2',
    name: 'Dr. Robert Chen',
    email: 'robert.chen@medcareplus.com',
    specialisation: 'Pediatrics',
    available: true
  },
  {
    id: 'doc-3',
    name: 'Dr. Emily Watson',
    email: 'emily.watson@medcareplus.com',
    specialisation: 'Neurology',
    available: false
  },
  {
    id: 'doc-4',
    name: 'Dr. Michael Patel',
    email: 'michael.patel@medcareplus.com',
    specialisation: 'Orthopedics',
    available: true
  },
  {
    id: 'doc-5',
    name: 'Dr. Ananya Sharma',
    email: 'ananya.sharma@medcareplus.com',
    specialisation: 'Dermatology',
    available: true
  }
];

// In-memory appointments list (Task 3)
let inMemoryAppointments = [
  {
    id: 'apt-1',
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Jenkins',
    date: '2026-08-22',
    timeSlot: '10:00 AM',
    status: 'confirmed',
    reason: 'Routine cardiac checkup'
  },
  {
    id: 'apt-2',
    patientName: 'Jane Smith',
    doctorName: 'Dr. Robert Chen',
    date: '2026-08-23',
    timeSlot: '02:30 PM',
    status: 'pending',
    reason: 'Child seasonal vaccination'
  },
  {
    id: 'apt-3',
    patientName: 'David Lee',
    doctorName: 'Dr. Michael Patel',
    date: '2026-08-21',
    timeSlot: '11:15 AM',
    status: 'cancelled',
    reason: 'Knee joint pain consultation'
  }
];

// ==========================================
// REST API ROUTES (Task 3 & Task 4)
// ==========================================

// Health / Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'MedCare Plus Hospital Appointment System API is running',
    endpoints: {
      doctors: 'GET /api/v1/doctors',
      appointments: 'GET /api/v1/appointments',
      createAppointment: 'POST /api/v1/appointments',
      mongoSeed: 'POST /api/v1/db/seed',
      mongoAppointments: 'GET /api/v1/db/appointments',
      validationDemo: 'POST /api/v1/db/test-validation'
    }
  });
});

/**
 * Task 3 & Task 4: GET /api/v1/doctors
 * Returns all doctors
 * HTTP Status: 200
 */
app.get('/api/v1/doctors', (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      count: inMemoryDoctors.length,
      data: inMemoryDoctors
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Task 3: GET /api/v1/appointments
 * Returns all appointments
 * HTTP Status: 200
 */
app.get('/api/v1/appointments', (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      count: inMemoryAppointments.length,
      data: inMemoryAppointments
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Task 3: POST /api/v1/appointments
 * Create a new appointment
 * HTTP Status: 201 on success, 400 on bad input
 */
app.post('/api/v1/appointments', (req, res, next) => {
  try {
    const { patientName, doctorName, date, timeSlot, status, reason } = req.body;

    // Validation
    if (!patientName || !doctorName || !date || !timeSlot) {
      const error = new Error('Missing required fields: patientName, doctorName, date, and timeSlot are required');
      error.statusCode = 400;
      return next(error);
    }

    const validStatuses = ['pending', 'confirmed', 'cancelled'];
    const appointmentStatus = status || 'pending';
    if (!validStatuses.includes(appointmentStatus)) {
      const error = new Error(`Invalid status "${status}". Allowed values: pending, confirmed, cancelled`);
      error.statusCode = 400;
      return next(error);
    }

    const newAppointment = {
      id: `apt-${Date.now()}`,
      patientName: patientName.trim(),
      doctorName: doctorName.trim(),
      date,
      timeSlot,
      status: appointmentStatus,
      reason: reason ? reason.trim() : 'General Consultation'
    };

    inMemoryAppointments.unshift(newAppointment);

    return res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: newAppointment
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// TASK 5: MONGODB OPERATIONS & VALIDATION DEMO
// ==========================================

/**
 * Task 5: POST /api/v1/db/seed
 * Seeds sample Patient, Doctor, and Appointment records into MongoDB
 */
app.post('/api/v1/db/seed', async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const error = new Error('MongoDB is not connected. Check MONGO_URI in .env');
      error.statusCode = 503;
      return next(error);
    }

    // Clean existing records
    await Appointment.deleteMany({});
    await Doctor.deleteMany({});
    await Patient.deleteMany({});

    // 1. Create Patients
    const patient1 = await Patient.create({
      name: 'Rudra Patel',
      email: 'rudra.patel@example.com',
      phone: '9876543210',
      bloodGroup: 'O+',
      age: 21
    });

    const patient2 = await Patient.create({
      name: 'Aarav Mehta',
      email: 'aarav.mehta@example.com',
      phone: '9123456780',
      bloodGroup: 'B+',
      age: 28
    });

    // 2. Create Doctors
    const doctor1 = await Doctor.create({
      name: 'Dr. Sarah Jenkins',
      email: 'sarah.jenkins@medcareplus.com',
      specialisation: 'Cardiology',
      available: true
    });

    const doctor2 = await Doctor.create({
      name: 'Dr. Robert Chen',
      email: 'robert.chen@medcareplus.com',
      specialisation: 'Pediatrics',
      available: true
    });

    // 3. Create Appointment referencing Patient and Doctor
    const appointment1 = await Appointment.create({
      patientId: patient1._id,
      doctorId: doctor1._id,
      date: '2026-08-25',
      timeSlot: '10:30 AM',
      status: 'pending',
      reason: 'Routine blood pressure and ECG follow-up.'
    });

    return res.status(201).json({
      success: true,
      message: 'MongoDB sample data seeded successfully with referenced models',
      data: {
        patients: [patient1, patient2],
        doctors: [doctor1, doctor2],
        appointment: appointment1
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Task 5: GET /api/v1/db/appointments
 * Retrieves appointments populated with Patient and Doctor documents
 */
app.get('/api/v1/db/appointments', async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const error = new Error('MongoDB is not connected.');
      error.statusCode = 503;
      return next(error);
    }

    const appointments = await Appointment.find()
      .populate('patientId', 'name email phone bloodGroup age')
      .populate('doctorId', 'name email specialisation available');

    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Task 5: POST /api/v1/db/test-validation
 * Demonstrates Mongoose schema validation failures with structured error responses
 * Tests: missing required fields, invalid blood group enum, invalid status enum, reason > 300 chars
 */
app.post('/api/v1/db/test-validation', async (req, res, next) => {
  try {
    const { testType } = req.body;

    if (testType === 'missing-required') {
      // Missing required name & email
      const patient = new Patient({});
      await patient.validate();
    } else if (testType === 'invalid-blood-group') {
      // Invalid blood group enum
      const patient = new Patient({
        name: 'Invalid Test',
        email: 'test@invalid.com',
        bloodGroup: 'Z+' // Not in enum
      });
      await patient.validate();
    } else if (testType === 'invalid-appointment-status') {
      // Invalid status enum
      const appointment = new Appointment({
        patientId: new mongoose.Types.ObjectId(),
        doctorId: new mongoose.Types.ObjectId(),
        date: '2026-08-25',
        timeSlot: '10:00 AM',
        status: 'unknown_status' // Not pending/confirmed/cancelled
      });
      await appointment.validate();
    } else if (testType === 'reason-exceeded') {
      // Reason exceeding 300 characters
      const longReason = 'A'.repeat(350);
      const appointment = new Appointment({
        patientId: new mongoose.Types.ObjectId(),
        doctorId: new mongoose.Types.ObjectId(),
        date: '2026-08-25',
        timeSlot: '10:00 AM',
        status: 'pending',
        reason: longReason
      });
      await appointment.validate();
    } else {
      // If no specific testType, attempt to create from request body
      const patient = new Patient(req.body);
      await patient.validate();
      return res.status(200).json({
        success: true,
        message: 'Validation passed successfully'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Validation passed'
    });
  } catch (error) {
    next(error);
  }
});

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`
  });
});

// ==========================================
// GLOBAL ERROR HANDLING MIDDLEWARE (PR 4 & Task 3 & Task 5)
// ==========================================
/**
 * Must be the last middleware registered in Express
 * Catches all errors (synchronous and async passed via next(err))
 * Formats Mongoose validation errors nicely without exposing raw stack traces
 */
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.name}: ${err.message}`);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  // Handle Mongoose Validation Errors (Task 5 structured error handling)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Schema Validation Failed';
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
      value: e.value
    }));
  }

  // Handle Mongoose CastError (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid format for field: ${err.path}`;
  }

  // Handle Duplicate Key Error (e.g. unique email)
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered (Unique constraint violation)';
    errors = err.keyValue;
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(errors && { errors })
  });
});

// ==========================================
// MONGODB CONNECTION & SERVER START
// ==========================================
const startServer = async () => {
  try {
    if (MONGO_URI) {
      await mongoose.connect(MONGO_URI);
      console.log(`[MongoDB] Connected successfully to: ${MONGO_URI}`);
    }
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to MongoDB (${error.message}). In-memory endpoints will continue to work.`);
  }

  app.listen(PORT, () => {
    console.log(`[Express Server] Running on http://localhost:${PORT}`);
  });
};

startServer();

module.exports = app;
