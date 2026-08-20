# PROJECT_CONTEXT.md — MedCare Plus Hospital Appointment System

**Subject:** ITUE301 — Advanced Web Development Frameworks  
**Practical Exam Set:** SET A — Hospital Appointment System  
**Repository:** [https://github.com/Rudra2986/itue301-exam-24DCS085-A](https://github.com/Rudra2986/itue301-exam-24DCS085-A)  
**Tech Stack:** React (Vite) + Express.js + Node.js + MongoDB (Mongoose)  
**Syllabus Coverage:** Practical 1 to Practical 5  

---

## 1. Problem Understanding
MedCare Plus is a private healthcare hospital requiring a centralized Hospital Appointment Management System to handle doctor directories, patient records, and appointment scheduling workflows.

The problem statement breaks this down into 5 sequential evaluation tasks mapped to the course syllabus:
1. **Task 1 (PR 1):** React Component Architecture — Create reusable components (`AppointmentCard`), page structure, props passing, and dynamic styling based on appointment status (`confirmed`, `pending`, `cancelled`).
2. **Task 2 (PR 2):** React Routing & State Management — Implement client-side routing via React Router (`/`, `/doctors`, `/booking`), navigation without page reloads, and controlled form inputs with `useState` reflecting real-time state changes on the UI.
3. **Task 3 (PR 3 / PR 4):** Express REST API & Middleware — Build an Express backend providing REST endpoints (`GET /api/v1/appointments`, `POST /api/v1/appointments`, `GET /api/v1/doctors`), a custom global `requestLogger` middleware logging `[METHOD] [PATH] [TIMESTAMP]`, and a global structured JSON error-handling middleware with proper HTTP status codes (200, 201, 400, 404, 500).
4. **Task 4 (PR 3):** REST API Consumption in React — Asynchronously fetch doctor data in `DoctorsPage` on component mount using `useEffect()`, handling 3 explicit states (`data`, `loading`, `error`) and conditional UI rendering.
5. **Task 5 (PR 5):** MongoDB & Mongoose Schema Design & Validation — Define Mongoose schemas for `Patient`, `Doctor`, and `Appointment` with field types, required constraints, enums, length limits, ObjectId references (`patientId -> Patient`, `doctorId -> Doctor`), environment variable connection (`MONGO_URI`), and structured validation error handling.

---

## 2. Requirements & Syllabus Mapping

| Practical Unit | Concept / Syllabus Topic | Project Implementation |
| :--- | :--- | :--- |
| **PR 1: React & Component Architecture** | Functional components, JSX, Props, Props destructuring, List rendering (`map()`), `key` prop, Component composition | `AppointmentCard.jsx`, `HomePage.jsx`, passing patient/doctor/date/timeSlot/status props |
| **PR 2: State Management & Routing** | `useState`, Controlled components, Event handlers (`onChange`, `onSubmit`), `react-router-dom`, `BrowserRouter`, `Routes`, `Route`, `Link`/`NavLink`, 404 Route | `Navbar.jsx`, `BookingPage.jsx`, real-time live preview of state, `NotFoundPage.jsx` |
| **PR 3: API Integration in React** | `fetch()`, `async/await`, `useEffect()`, dependency array `[]`, Loading state, Error state, Conditional rendering, CORS | `DoctorsPage.jsx` consuming `GET /api/v1/doctors` with 3 states and feedback boxes |
| **PR 4: Express REST API & Middleware** | Express app, HTTP methods (GET, POST), `express.json()`, custom middleware, `req`, `res`, `next()`, logging, error handling, status codes (200, 201, 400, 500) | `backend/server.js`, `requestLogger`, global error middleware, in-memory endpoints |
| **PR 5: MongoDB & Mongoose** | NoSQL, Mongoose ODM, Schema, Model, validation (`required`, `enum`, `maxlength`), references (`ObjectId`), `.env` configuration | `backend/models/Patient.js`, `Doctor.js`, `Appointment.js`, `/api/v1/db/test-validation` |

---

## 3. Technologies Used
- **Frontend:**
  - React 18.x
  - Vite 5.x (Fast build tool & dev server)
  - React Router DOM 6.x (Client-side routing)
  - Pure Vanilla CSS (Clean, flat design, no external CSS frameworks)
- **Backend:**
  - Node.js (Runtime environment)
  - Express.js 4.x (Web framework for REST APIs)
  - CORS (Cross-Origin Resource Sharing middleware)
  - Dotenv (Environment variable manager)
- **Database & ODM:**
  - MongoDB (Document NoSQL Database)
  - Mongoose 8.x (Object Data Modeling library for Node.js)

---

## 4. Complete Project Architecture & Folder Structure

```text
itue301-exam-24DCS085-A/
├── frontend/                          # React Client (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx             # Task 2: Navigation bar with React Router NavLinks
│   │   │   └── AppointmentCard.jsx    # Task 1: Reusable card with dynamic status styling
│   │   ├── pages/
│   │   │   ├── HomePage.jsx           # Task 1 & 2: Overview & appointment list via map()
│   │   │   ├── DoctorsPage.jsx        # Task 4: API consumer with data, loading, error states
│   │   │   ├── BookingPage.jsx        # Task 2: Controlled appointment form with live state preview
│   │   │   └── NotFoundPage.jsx       # PR 2: 404 fallback page
│   │   ├── App.jsx                    # Route configuration & layout wrapper
│   │   ├── App.css                    # Layout styling
│   │   ├── index.css                  # Clean, accessible practical-exam CSS system
│   │   └── main.jsx                   # React entry point with BrowserRouter
│   ├── index.html                     # HTML root with Inter font
│   ├── vite.config.js                 # Vite dev server configuration
│   └── package.json                   # Frontend dependencies & scripts
│
├── backend/                           # Express & Node.js API Server
│   ├── models/
│   │   ├── Patient.js                 # Task 5: Patient Mongoose Schema & Model
│   │   ├── Doctor.js                  # Task 5: Doctor Mongoose Schema & Model
│   │   └── Appointment.js             # Task 5: Appointment Mongoose Schema with Refs
│   ├── server.js                      # Task 3, 4, 5: Express server, middlewares, API routes
│   ├── package.json                   # Backend dependencies & start scripts
│   └── .env                           # Local environment variables (PORT, MONGO_URI)
│
├── .env.example                       # Environment variable template for submission
├── .gitignore                         # Git exclusion rules (node_modules, .env, etc.)
├── README.md                          # Quick setup & execution guide
└── PROJECT_CONTEXT.md                 # Complete architectural & viva documentation
```

---

## 5. Purpose of Every Important File

### Frontend Files
1. `frontend/src/main.jsx`: Mounts the React application into `#root` DOM node and wraps it in `<BrowserRouter>` for client-side routing.
2. `frontend/src/App.jsx`: Declares the top-level layout with `<Navbar />`, `<Routes>`, `<Route>` paths (`/`, `/doctors`, `/booking`, `*`), and `<footer />`.
3. `frontend/src/components/Navbar.jsx`: Implements the navigation header with `<NavLink>` components to enable instant route switching without browser page reloads.
4. `frontend/src/components/AppointmentCard.jsx`: Reusable component displaying 5 props (`patientName`, `doctorName`, `date`, `timeSlot`, `status`) and dynamic CSS badges (`status-confirmed`, `status-pending`, `status-cancelled`).
5. `frontend/src/pages/HomePage.jsx`: Fetches and renders scheduled appointments by mapping over an array and rendering `<AppointmentCard>` components.
6. `frontend/src/pages/DoctorsPage.jsx`: Fetches `GET /api/v1/doctors` on mount via `useEffect()`. Manages `data`, `loading`, and `error` states to conditionally render UI feedback.
7. `frontend/src/pages/BookingPage.jsx`: Controlled appointment booking form managing input state via `useState()`, providing live interactive preview, and dispatching `POST /api/v1/appointments`.
8. `frontend/src/pages/NotFoundPage.jsx`: Renders a friendly 404 message when users navigate to undefined routes.
9. `frontend/src/index.css`: Global typography, responsive grids, buttons, form controls, and status badges following exam UI guidelines.

### Backend Files
1. `backend/server.js`: Express application entry point. Configures `express.json()`, `cors()`, custom `requestLogger`, REST endpoints, global error handler, and MongoDB connection.
2. `backend/models/Patient.js`: Mongoose schema for patients with validation (`name`, `email` unique, `bloodGroup` enum, `age`).
3. `backend/models/Doctor.js`: Mongoose schema for doctors (`name`, `email`, `specialisation`, `available`).
4. `backend/models/Appointment.js`: Mongoose schema referencing `Patient` and `Doctor` by ObjectId, with status enums and reason character limits.
5. `backend/.env` & `.env.example`: Configuration variables (`PORT=5000`, `MONGO_URI=...`).

---

## 6. Detailed Implementation & Code Explanations

### Task 1: AppointmentCard Reusable Component & Props
```jsx
function AppointmentCard({ patientName, doctorName, date, timeSlot, status = 'pending' }) {
  const getStatusClass = (currentStatus) => {
    switch (currentStatus?.toLowerCase()) {
      case 'confirmed': return 'status-badge status-confirmed';
      case 'cancelled': return 'status-badge status-cancelled';
      case 'pending':
      default: return 'status-badge status-pending';
    }
  };

  return (
    <div className="appointment-card">
      <div className="appointment-header">
        <div className="appointment-patient">{patientName || 'Patient Name'}</div>
        <span className={getStatusClass(status)}>{status}</span>
      </div>
      <div className="appointment-details">
        <div className="detail-item">
          <span className="detail-label">Doctor</span>
          <span className="detail-value">{doctorName}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Date</span>
          <span className="detail-value">{date}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Time Slot</span>
          <span className="detail-value">{timeSlot}</span>
        </div>
      </div>
    </div>
  );
}
```
*Why this works:* Props are destructured directly in the function argument list. The status styling is computed conditionally, attaching semantic CSS classes (`status-confirmed`, `status-pending`, `status-cancelled`) without hardcoding inline styles.

---

### Task 2: React Router & Controlled State Management
```jsx
// Controlled form state
const [formData, setFormData] = useState({
  patientName: '',
  doctorName: 'Dr. Sarah Jenkins',
  date: '',
  timeSlot: '09:00 AM',
  reason: ''
});

// Meaningful secondary state
const [selectedDoctor, setSelectedDoctor] = useState('Dr. Sarah Jenkins');

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  if (name === 'doctorName') setSelectedDoctor(value);
};
```
*Why this works:* Form elements are "controlled" because their displayed value is driven by React state (`value={formData.patientName}`), and user input immediately invokes `handleChange` to update the state. The live preview dynamically re-renders on every keystroke.

---

### Task 3: Express Request Logger Middleware & Error Handler
```javascript
// Custom Request Logger Middleware
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.originalUrl || req.url} [${timestamp}]`);
  next(); // Must call next() to pass control to the next handler
};
app.use(requestLogger);

// Global Structured Error Handling Middleware
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Schema Validation Failed';
    errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(errors && { errors })
  });
});
```
*Why this works:* Middleware in Express is executed in pipeline order. `requestLogger` logs the HTTP method, path, and timestamp before calling `next()`. The 4-argument `(err, req, res, next)` middleware at the end catches all synchronous and asynchronous errors and formats them into clean JSON without leaking server stack traces.

---

### Task 4: Asynchronous REST API Consumption with 3 States
```jsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/api/v1/doctors');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      setData(result.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };
  fetchDoctors();
}, []);
```
*Why this works:*
- `useEffect` with `[]` triggers once when the component mounts.
- `loading` starts as `true` to render a loading indicator.
- If the fetch fails or the server is down, `error` is captured in `catch` and rendered cleanly.
- `finally` ensures `loading` is set to `false` regardless of success or failure.

---

### Task 5: Mongoose Schema Design & Referenced Models
```javascript
// Patient Schema with Validation & Enum
const patientSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Patient name is required'] },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  age: { type: Number, min: 0 }
});

// Appointment Schema referencing Patient and Doctor
const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  reason: { type: String, maxlength: 300 }
});
```

---

## 7. REST API Endpoints Summary

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API Health check & endpoint directory | `200 OK` |
| `GET` | `/api/v1/doctors` | Retrieve all doctors list | `200 OK` |
| `GET` | `/api/v1/appointments` | Retrieve all appointments | `200 OK` |
| `POST` | `/api/v1/appointments` | Create a new appointment | `201 Created` |
| `POST` | `/api/v1/db/seed` | Seed initial MongoDB records with relations | `201 Created` |
| `GET` | `/api/v1/db/appointments` | Get appointments populated with Patient & Doctor | `200 OK` |
| `POST` | `/api/v1/db/test-validation` | Test Mongoose validation error handling | `400 Bad Request` |

---

## 8. Installation and Execution Steps

### Prerequisites
- Node.js installed (v18+)
- MongoDB Community Server running locally or MongoDB Atlas connection string

### Step 1: Backend Setup
```bash
cd backend
npm install
npm start
```
*Console output:*
```text
[Express Server] Running on http://localhost:5000
[MongoDB] Connected successfully to: mongodb://127.0.0.1:27017/hospital_db
```

### Step 2: Frontend Setup
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*Console output:*
```text
  VITE v5.4.1  ready in 250 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 9. Testing & Demonstration Procedure

### 1. Test React Frontend in Browser
- Open `http://localhost:5173/` in your browser.
- Verify the **Home** page renders scheduled appointments using `AppointmentCard` components with colored status badges.
- Click **Doctors** in the navigation bar to verify client-side navigation without full-page reload and verify the doctor cards load from the API.
- Click **Book Appointment** to open the form.
- Type a patient name and choose a doctor. Notice the **Live State Preview** updating instantly.
- Submit the form and observe the success confirmation message and state reset.
- Return to **Home** to see the new appointment listed.

### 2. Test Express REST API via Postman / Thunder Client / cURL
- **GET All Doctors:**
  ```bash
  GET http://localhost:5000/api/v1/doctors
  ```
  *Response (200 OK):*
  ```json
  {
    "success": true,
    "count": 5,
    "data": [
      {
        "id": "doc-1",
        "name": "Dr. Sarah Jenkins",
        "email": "sarah.jenkins@medcareplus.com",
        "specialisation": "Cardiology",
        "available": true
      }
    ]
  }
  ```

- **POST Create Appointment:**
  ```bash
  POST http://localhost:5000/api/v1/appointments
  Content-Type: application/json

  {
    "patientName": "Rudra Patel",
    "doctorName": "Dr. Sarah Jenkins",
    "date": "2026-08-25",
    "timeSlot": "10:00 AM",
    "status": "pending",
    "reason": "General Health Checkup"
  }
  ```
  *Response (201 Created):*
  ```json
  {
    "success": true,
    "message": "Appointment created successfully",
    "data": { ... }
  }
  ```

- **Verify Request Logger in Terminal:**
  ```text
  [GET] /api/v1/doctors [2026-08-20T10:15:20.000Z]
  [POST] /api/v1/appointments [2026-08-20T10:16:05.000Z]
  ```

### 3. Test MongoDB & Mongoose Validation
- **Seed Database with Relations:**
  ```bash
  POST http://localhost:5000/api/v1/db/seed
  ```
- **Demonstrate Validation Failure (e.g. Invalid Blood Group):**
  ```bash
  POST http://localhost:5000/api/v1/db/test-validation
  Content-Type: application/json

  {
    "testType": "invalid-blood-group"
  }
  ```
  *Response (400 Bad Request with Structured JSON):*
  ```json
  {
    "success": false,
    "statusCode": 400,
    "message": "Schema Validation Failed",
    "errors": [
      {
        "field": "bloodGroup",
        "message": "Z+ is not a valid blood group. Allowed: A+, A-, B+, B-, AB+, AB-, O+, O-",
        "value": "Z+"
      }
    ]
  }
  ```

---

## 10. Common Errors and Fixes

1. **CORS Error in Browser Console (`Access-Control-Allow-Origin` missing):**
   - *Cause:* Frontend running on port 5173 is trying to access backend on port 5000 without CORS headers.
   - *Fix:* Ensure `app.use(cors())` is placed before route definitions in `backend/server.js`.

2. **`useEffect` Infinite Fetch Loop:**
   - *Cause:* Missing dependency array in `useEffect(fetchData)`.
   - *Fix:* Pass an empty dependency array `useEffect(fetchData, [])` so it runs strictly once on mount.

3. **Form Submitting Causes Full Page Refresh:**
   - *Cause:* Native HTML form submit reloads page.
   - *Fix:* Add `e.preventDefault()` inside the `handleSubmit` event handler.

4. **Mongoose `CastError: Cast to ObjectId failed`:**
   - *Cause:* Passing an invalid 24-hex string as `patientId` or `doctorId`.
   - *Fix:* Ensure ObjectId is generated using `new mongoose.Types.ObjectId()` or valid existing document `_id`.

5. **Server Crashes on MongoDB Connection Failure:**
   - *Cause:* Unhandled promise rejection on `mongoose.connect()`.
   - *Fix:* Wrap `mongoose.connect()` in `try/catch` and fall back gracefully to in-memory mode so the API remains functional.

---

## 11. Viva Questions and Answers (Based on Real Implementation)

### Q1: What is the difference between Props and State in React?
> **Answer:**
> - **Props (Properties):** Immutable data passed from a parent component down to a child component (e.g., passing `patientName` and `status` to `AppointmentCard`). The child component cannot modify props directly.
> - **State:** Internal, mutable data managed within the component itself using `useState` (e.g., `formData` in `BookingPage`). When state changes via its setter function (`setFormData`), React triggers a re-render.

### Q2: Why is the `key` prop required when rendering lists using `.map()`?
> **Answer:**
> React uses the `key` prop during reconciliation (Virtual DOM diffing) to uniquely identify which elements in a list have changed, been added, or been removed. Without unique keys, React re-renders the entire list unnecessarily, hurting performance and causing state tracking bugs in child components.

### Q3: What is the role of Middleware in Express.js?
> **Answer:**
> Middleware functions in Express are functions that have access to the request object (`req`), response object (`res`), and the `next` function. They can execute code, modify `req`/`res`, end the request-response cycle, or call `next()` to pass control to the subsequent middleware. In our project, `requestLogger` logs every request, and the error-handling middleware catches all errors.

### Q4: Why must the error-handling middleware have four arguments in Express?
> **Answer:**
> Express specifically identifies error-handling middleware by checking function arity (number of parameters). If a middleware has 4 arguments `(err, req, res, next)`, Express knows it is an error handler and skips standard middleware to route errors directly to it when `next(err)` is called or an exception is thrown.

### Q5: How does `useEffect` work with its dependency array?
> **Answer:**
> `useEffect` handles side effects (e.g. data fetching, subscriptions).
> - With `[]` (empty array): The effect runs once after the component mounts (used in `DoctorsPage`).
> - With `[prop, state]`: The effect runs on mount and whenever any specified dependency value changes.
> - Without array: The effect runs on every single render.

### Q6: How does Mongoose Schema Validation work and what are Enums?
> **Answer:**
> Mongoose schemas define the structure and validation rules for documents in a MongoDB collection. An `enum` (enumeration) validator restricts the string value of a field to a predefined set of allowed values (e.g., `status: ['pending', 'confirmed', 'cancelled']` and `bloodGroup: ['A+', 'A-', ...']`). If an unlisted value is supplied, Mongoose validation rejects the write before sending it to MongoDB.

---

## 12. Examiner Explanation Script (30-Second Summary)

> *"Good morning Sir/Madam. For Set A — Hospital Appointment System, I have built a complete full-stack web application implementing all 5 syllabus practicals:*
> 
> *1. In the React frontend, I created reusable components like `AppointmentCard` with conditional status styling for confirmed, pending, and cancelled appointments.*
> *2. I configured `react-router-dom` for client-side navigation between Home, Doctors, and Booking pages without full page reloads, and built a controlled booking form using `useState` that updates live on screen.*
> *3. On the Express backend, I built REST endpoints for doctors and appointments, a custom `requestLogger` middleware that logs every request with a timestamp, and a global error-handling middleware returning structured JSON.*
> *4. In `DoctorsPage`, I consumed the REST API asynchronously using `useEffect` on mount, handling loading, error, and data states.*
> *5. In the database layer, I designed Mongoose schemas for Patient, Doctor, and Appointment with ObjectId references, enums, required constraints, and custom validation error handling."*

---

## 13. Final Project Checklist

- [x] Task 1: `AppointmentCard` created accepting 5 props (`patientName`, `doctorName`, `date`, `timeSlot`, `status`)
- [x] Task 1: Conditional CSS status classes (`status-confirmed`, `status-pending`, `status-cancelled`)
- [x] Task 2: React Router configured (`/`, `/doctors`, `/booking`, `*`)
- [x] Task 2: Navigation bar with `NavLink` without full page reload
- [x] Task 2: `BookingPage` controlled form with `useState` and live state preview
- [x] Task 3: Express REST API endpoints (`GET /api/v1/appointments`, `POST /api/v1/appointments`, `GET /api/v1/doctors`)
- [x] Task 3: Custom `requestLogger` middleware logging `[METHOD] [PATH] [TIMESTAMP]`
- [x] Task 3: Global error-handling middleware with structured JSON responses
- [x] Task 3: Proper HTTP status codes (200, 201, 400, 404, 500)
- [x] Task 4: `DoctorsPage` consuming `GET /api/v1/doctors` using `fetch()` and `useEffect()`
- [x] Task 4: 3 explicit states maintained (`data`, `loading`, `error`) with conditional rendering
- [x] Task 5: Mongoose Schemas for `Patient`, `Doctor`, and `Appointment` with refs and enums
- [x] Task 5: Environment variable configuration with `.env` and `.env.example`
- [x] Task 5: Structured validation error handling demonstrated
- [x] Minimal, clean, readable UI adhering strictly to exam guidelines
- [x] `README.md` and `PROJECT_CONTEXT.md` completed
- [x] Git repository configured with `itue301-exam-24DCS085-5CSE2-A`
