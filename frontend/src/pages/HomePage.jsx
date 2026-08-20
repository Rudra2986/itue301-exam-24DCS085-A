import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppointmentCard from '../components/AppointmentCard';

/**
 * Task 1 & Task 2: HomePage Component
 * Displays system overview and a list of appointments using AppointmentCard component.
 * Demonstrates: Component composition, props passing, list rendering with map() and key prop.
 */
function HomePage() {
  const [appointments, setAppointments] = useState([
    {
      id: 'apt-default-1',
      patientName: 'John Doe',
      doctorName: 'Dr. Sarah Jenkins',
      date: '2026-08-22',
      timeSlot: '10:00 AM',
      status: 'confirmed'
    },
    {
      id: 'apt-default-2',
      patientName: 'Jane Smith',
      doctorName: 'Dr. Robert Chen',
      date: '2026-08-23',
      timeSlot: '02:30 PM',
      status: 'pending'
    },
    {
      id: 'apt-default-3',
      patientName: 'David Lee',
      doctorName: 'Dr. Michael Patel',
      date: '2026-08-21',
      timeSlot: '11:15 AM',
      status: 'cancelled'
    }
  ]);
  const [loading, setLoading] = useState(false);

  // Fetch live appointments from Express backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/v1/appointments');
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setAppointments(json.data);
          }
        }
      } catch (err) {
        console.log('Using default appointment records for preview.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: '24px' }}>
        <h1>MedCare Plus Hospital</h1>
        <p>
          Welcome to MedCare Plus Hospital Appointment Management System. View scheduled appointments,
          check doctor availability, or book a new medical appointment.
        </p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
          <Link to="/booking" className="btn btn-primary">
            Book New Appointment
          </Link>
          <Link to="/doctors" className="btn btn-secondary">
            View Doctors List
          </Link>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2>Scheduled Appointments</h2>
          <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
            Total: {appointments.length}
          </span>
        </div>

        {loading && <div className="loading-box">Loading appointments...</div>}

        {appointments.length === 0 ? (
          <p>No appointments found. Use the Book Appointment page to create one.</p>
        ) : (
          <div>
            {/* PR 1: List rendering with map() and key prop + Passing props to AppointmentCard */}
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id || appointment._id}
                patientName={appointment.patientName}
                doctorName={appointment.doctorName}
                date={appointment.date}
                timeSlot={appointment.timeSlot}
                status={appointment.status}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
