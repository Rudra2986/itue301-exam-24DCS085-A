import React, { useState, useEffect } from 'react';

/**
 * Task 4: DoctorsPage Component
 * Consumes Express REST API: GET http://localhost:5000/api/v1/doctors
 * Implements:
 * 1. useEffect for fetching data on component mount
 * 2. 3 state variables: data, loading, error
 * 3. Conditional rendering for loading state, error state, and successful data rendering
 * 4. Displays: Doctor name, Specialisation, Availability
 */
function DoctorsPage() {
  // Three required states (Task 4)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Asynchronous API call on component mount (Task 4)
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:5000/api/v1/doctors');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch doctors from server');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []); // Empty dependency array ensures request runs on mount

  return (
    <div className="container">
      <div className="card">
        <h1>Doctors Directory</h1>
        <p>Browse available specialist doctors at MedCare Plus Hospital.</p>
      </div>

      {/* 1. Loading state indicator */}
      {loading && (
        <div className="loading-box">
          <p>Loading doctor information from server...</p>
        </div>
      )}

      {/* 2. Error state message */}
      {error && !loading && (
        <div className="error-box">
          <p>
            <strong>Error:</strong> {error}
          </p>
          <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
            Please ensure the backend server is running on http://localhost:5000
          </p>
        </div>
      )}

      {/* 3. Successful data rendering */}
      {!loading && !error && (
        <div>
          {data.length === 0 ? (
            <div className="card">
              <p>No doctors found in the directory.</p>
            </div>
          ) : (
            <div className="grid-3">
              {data.map((doctor) => (
                <div key={doctor.id || doctor._id || doctor.email} className="doctor-card">
                  {/* Doctor Name */}
                  <div className="doctor-name">{doctor.name}</div>
                  
                  {/* Specialisation */}
                  <div className="doctor-spec">{doctor.specialisation}</div>
                  
                  <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '8px' }}>
                    {doctor.email}
                  </div>

                  {/* Availability */}
                  <div className="doctor-avail">
                    Status:{' '}
                    <span
                      className={`avail-badge ${
                        doctor.available ? 'avail-yes' : 'avail-no'
                      }`}
                    >
                      {doctor.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DoctorsPage;
