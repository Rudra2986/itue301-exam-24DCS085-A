import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 404 / Not Found Route Component (PR 2 Syllabus)
 */
function NotFoundPage() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '3rem', color: '#0284c7' }}>404</h1>
        <h2>Page Not Found</h2>
        <p>The requested page route does not exist.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '16px' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
