# MedCare Plus - Hospital Appointment System

**Course:** ITUE301 — Advanced Web Development Frameworks  
**Practical Exam:** SET A — Hospital Appointment System  
**Repository:** [https://github.com/Rudra2986/itue301-exam-24DCS085-A](https://github.com/Rudra2986/itue301-exam-24DCS085-A)

---

## 1. Project Name
**MedCare Plus Hospital Appointment Management System**

A full-stack web application built using **React (Vite) + Express.js + Node.js + MongoDB (Mongoose)** covering all 5 syllabus practicals:
- **Task 1:** React Component Architecture (`AppointmentCard`, `HomePage`, `DoctorsPage`, `BookingPage`, props passing, list rendering)
- **Task 2:** React Routing and State Management (`react-router-dom`, `useState`, controlled forms, live preview)
- **Task 3:** Express REST API with Custom Logging & Error Handling Middleware
- **Task 4:** Asynchronous REST API Consumption in React with 3 states (`data`, `loading`, `error`)
- **Task 5:** MongoDB & Mongoose Schema Design, Model References, and Structured Validation

---

## 2. Frontend Setup and Run Command

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the frontend application at: `http://localhost:5173`

---

## 3. Backend Setup and Run Command

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node server.js
   # or
   npm start
   ```
4. The backend server runs on: `http://localhost:5000`

---

## 4. MongoDB Setup

1. Ensure MongoDB service is running locally on port `27017` or use MongoDB Atlas.
2. In the `backend/.env` file, specify your MongoDB connection string:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/hospital_db
   ```
3. The server automatically connects to MongoDB upon launch.
4. To seed test records into MongoDB, send a POST request:
   ```bash
   POST http://localhost:5000/api/v1/db/seed
   ```
5. To test Mongoose validation errors, send a POST request:
   ```bash
   POST http://localhost:5000/api/v1/db/test-validation
   ```

---

## 5. Required Environment Variables

Create a `.env` file inside the `backend/` directory (or use `.env.example` as a template):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hospital_db
```

---

## Project Structure
```text
itue301-exam-24DCS085-A/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── AppointmentCard.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── DoctorsPage.jsx
│   │   │   ├── BookingPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── models/
│   │   ├── Patient.js
│   │   ├── Doctor.js
│   │   └── Appointment.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .env.example
├── .gitignore
├── README.md
└── PROJECT_CONTEXT.md
```
