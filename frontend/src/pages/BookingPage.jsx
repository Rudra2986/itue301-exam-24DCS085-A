import React, { useState } from 'react';
import AppointmentCard from '../components/AppointmentCard';

/**
 * Task 2: BookingPage Component
 * Demonstrates:
 * 1. Form handling & Controlled Components (onChange, onSubmit, event handling)
 * 2. useState for state management (formData, selectedDoctor, submissionState)
 * 3. Live state reflection (displaying entered patient name / selected doctor in real-time)
 * 4. API submission: POST /api/v1/appointments (Task 3 integration)
 */
function BookingPage() {
  // State 1: Form data controlled state object (Patient name, Doctor name, Date, Time slot, reason)
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: 'Dr. Sarah Jenkins',
    date: '',
    timeSlot: '09:00 AM',
    reason: ''
  });

  // State 2: Meaningful secondary state: Selected doctor preview/details & state feedback
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Sarah Jenkins');

  // State 3: Submission feedback state
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    message: '',
    isError: false
  });

  // Predefined doctors list for easy selection
  const doctorOptions = [
    { name: 'Dr. Sarah Jenkins', spec: 'Cardiology' },
    { name: 'Dr. Robert Chen', spec: 'Pediatrics' },
    { name: 'Dr. Michael Patel', spec: 'Orthopedics' },
    { name: 'Dr. Ananya Sharma', spec: 'Dermatology' }
  ];

  // Predefined time slots
  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:15 AM',
    '02:00 PM',
    '03:30 PM',
    '04:45 PM'
  ];

  // Handle input change for controlled components (PR 2)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Update selected doctor state if doctor field changes
    if (name === 'doctorName') {
      setSelectedDoctor(value);
    }
  };

  // Handle form submission (PR 2 & Task 3 POST /api/v1/appointments)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.patientName || !formData.date || !formData.timeSlot) {
      setSubmitStatus({
        loading: false,
        success: false,
        message: 'Please fill in all required fields.',
        isError: true
      });
      return;
    }

    try {
      setSubmitStatus({ loading: true, success: false, message: '', isError: false });

      const response = await fetch('http://localhost:5000/api/v1/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          patientName: formData.patientName,
          doctorName: formData.doctorName,
          date: formData.date,
          timeSlot: formData.timeSlot,
          status: 'pending',
          reason: formData.reason || 'General Consultation'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create appointment');
      }

      setSubmitStatus({
        loading: false,
        success: true,
        message: `Appointment successfully booked for ${formData.patientName}! Status: Pending confirmation.`,
        isError: false
      });

      // Reset form
      setFormData({
        patientName: '',
        doctorName: selectedDoctor,
        date: '',
        timeSlot: '09:00 AM',
        reason: ''
      });
    } catch (err) {
      setSubmitStatus({
        loading: false,
        success: false,
        message: err.message || 'Network error while booking appointment.',
        isError: true
      });
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Book an Appointment</h1>
        <p>Fill out the form below to schedule an appointment with a hospital specialist.</p>
      </div>

      {/* Success or Error Feedback */}
      {submitStatus.success && (
        <div className="feedback-box">
          <strong>Success:</strong> {submitStatus.message}
        </div>
      )}

      {submitStatus.isError && (
        <div className="error-box">
          <strong>Error:</strong> {submitStatus.message}
        </div>
      )}

      <div className="grid-2">
        {/* Left Column: Appointment Booking Form */}
        <div className="card">
          <h2>Appointment Form</h2>
          <form onSubmit={handleSubmit}>
            {/* Patient Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="patientName">
                Patient Name *
              </label>
              <input
                id="patientName"
                name="patientName"
                type="text"
                className="form-control"
                placeholder="Enter patient full name"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Doctor Selection */}
            <div className="form-group">
              <label className="form-label" htmlFor="doctorName">
                Select Doctor *
              </label>
              <select
                id="doctorName"
                name="doctorName"
                className="form-control"
                value={formData.doctorName}
                onChange={handleChange}
                required
              >
                {doctorOptions.map((doc) => (
                  <option key={doc.name} value={doc.name}>
                    {doc.name} ({doc.spec})
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="form-group">
              <label className="form-label" htmlFor="date">
                Appointment Date *
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Time Slot */}
            <div className="form-group">
              <label className="form-label" htmlFor="timeSlot">
                Time Slot *
              </label>
              <select
                id="timeSlot"
                name="timeSlot"
                className="form-control"
                value={formData.timeSlot}
                onChange={handleChange}
                required
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            {/* Reason */}
            <div className="form-group">
              <label className="form-label" htmlFor="reason">
                Reason for Visit (Optional)
              </label>
              <textarea
                id="reason"
                name="reason"
                className="form-control"
                rows="2"
                placeholder="Brief description of symptoms or consultation reason"
                value={formData.reason}
                onChange={handleChange}
                maxLength="300"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={submitStatus.loading}
            >
              {submitStatus.loading ? 'Booking...' : 'Confirm Appointment'}
            </button>
          </form>
        </div>

        {/* Right Column: Real-Time State Display (Task 2 Requirement) */}
        <div>
          <div className="card">
            <h2>Live State Preview</h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563' }}>
              The values below reflect state updates in real-time as you type in the form:
            </p>

            <div style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '4px', marginBottom: '14px' }}>
              <div style={{ marginBottom: '6px' }}>
                <strong>Entered Patient Name:</strong>{' '}
                <span style={{ color: '#0284c7', fontWeight: 600 }}>
                  {formData.patientName || '(None entered yet)'}
                </span>
              </div>
              <div style={{ marginBottom: '6px' }}>
                <strong>Selected Doctor State:</strong>{' '}
                <span style={{ color: '#0284c7', fontWeight: 600 }}>
                  {selectedDoctor}
                </span>
              </div>
              <div>
                <strong>Selected Schedule:</strong>{' '}
                <span>
                  {formData.date ? `${formData.date} at ${formData.timeSlot}` : '(Select date)'}
                </span>
              </div>
            </div>

            <h3>Live AppointmentCard Preview</h3>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '10px' }}>
              Demonstrates Task 1 AppointmentCard component receiving current form state as props:
            </p>

            {/* Pass state values dynamically to AppointmentCard */}
            <AppointmentCard
              patientName={formData.patientName || 'Patient Name'}
              doctorName={formData.doctorName}
              date={formData.date || '2026-08-25'}
              timeSlot={formData.timeSlot}
              status="pending"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
