import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import BookingPage from './pages/BookingPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

/**
 * Task 2: App Component with React Router Configuration
 * Configures client-side routes:
 * - /         -> HomePage
 * - /doctors  -> DoctorsPage
 * - /booking  -> BookingPage
 * - *         -> NotFoundPage (404 fallback)
 */
function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>MedCare Plus Hospital Appointment System &copy; 2026 | Practical Exam - SET A</p>
      </footer>
    </div>
  );
}

export default App;
