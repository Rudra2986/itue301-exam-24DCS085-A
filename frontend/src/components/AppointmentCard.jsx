import React from 'react';

/**
 * Task 1: AppointmentCard Reusable Component
 * Accepts props: patientName, doctorName, date, timeSlot, status
 * Displays all 5 values.
 * Applies dynamic CSS classes based on status (confirmed, pending, cancelled).
 */
function AppointmentCard({ patientName, doctorName, date, timeSlot, status = 'pending' }) {
  // Determine badge class based on status prop
  const getStatusClass = (currentStatus) => {
    switch (currentStatus?.toLowerCase()) {
      case 'confirmed':
        return 'status-badge status-confirmed';
      case 'cancelled':
        return 'status-badge status-cancelled';
      case 'pending':
      default:
        return 'status-badge status-pending';
    }
  };

  return (
    <div className="appointment-card">
      <div className="appointment-header">
        <div className="appointment-patient">{patientName || 'Patient Name'}</div>
        <span className={getStatusClass(status)}>
          {status || 'pending'}
        </span>
      </div>

      <div className="appointment-details">
        <div className="detail-item">
          <span className="detail-label">Doctor</span>
          <span className="detail-value">{doctorName || 'Not Assigned'}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Date</span>
          <span className="detail-value">{date || 'YYYY-MM-DD'}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Time Slot</span>
          <span className="detail-value">{timeSlot || 'Not Selected'}</span>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCard;
