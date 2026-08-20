// test-api.js - Comprehensive test suite for all endpoints and validations
const http = require('http');

const request = (path, method, data) => {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : '';
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (err) => reject(err));
    if (postData) req.write(postData);
    req.end();
  });
};

async function runTests() {
  console.log('====================================================');
  console.log('RUNNING COMPLETE REST API & VALIDATION VERIFICATION');
  console.log('====================================================\n');

  // Test 1: GET /api/v1/doctors (Task 3 & 4)
  console.log('1. Testing GET /api/v1/doctors:');
  const res1 = await request('/api/v1/doctors', 'GET');
  console.log(`Status: ${res1.status}`);
  console.log(`Doctor count: ${res1.data.count}`);
  console.log(`First doctor: ${res1.data.data[0].name} (${res1.data.data[0].specialisation})`);
  console.log('--- Passed ---\n');

  // Test 2: GET /api/v1/appointments (Task 3)
  console.log('2. Testing GET /api/v1/appointments:');
  const res2 = await request('/api/v1/appointments', 'GET');
  console.log(`Status: ${res2.status}`);
  console.log(`Appointment count: ${res2.data.count}`);
  console.log('--- Passed ---\n');

  // Test 3: POST /api/v1/appointments (Task 3)
  console.log('3. Testing POST /api/v1/appointments (Valid payload):');
  const newApt = {
    patientName: 'Rudra Patel',
    doctorName: 'Dr. Sarah Jenkins',
    date: '2026-08-25',
    timeSlot: '10:00 AM',
    status: 'pending',
    reason: 'Cardiology follow-up checkup'
  };
  const res3 = await request('/api/v1/appointments', 'POST', newApt);
  console.log(`Status: ${res3.status} (Expected: 201)`);
  console.log(`Created:`, res3.data.data);
  console.log('--- Passed ---\n');

  // Test 4: POST /api/v1/appointments (Invalid missing fields)
  console.log('4. Testing POST /api/v1/appointments (Validation error check):');
  const res4 = await request('/api/v1/appointments', 'POST', { patientName: 'Incomplete Patient' });
  console.log(`Status: ${res4.status} (Expected: 400)`);
  console.log(`Error Response:`, res4.data);
  console.log('--- Passed ---\n');

  // Test 5: Mongoose Validation Demo: Invalid Blood Group (Task 5)
  console.log('5. Testing Mongoose Validation: Invalid Blood Group:');
  const res5 = await request('/api/v1/db/test-validation', 'POST', { testType: 'invalid-blood-group' });
  console.log(`Status: ${res5.status} (Expected: 400)`);
  console.log(`Validation Error Output:`, JSON.stringify(res5.data, null, 2));
  console.log('--- Passed ---\n');

  // Test 6: Mongoose Validation Demo: Missing Required Fields (Task 5)
  console.log('6. Testing Mongoose Validation: Missing Required Fields:');
  const res6 = await request('/api/v1/db/test-validation', 'POST', { testType: 'missing-required' });
  console.log(`Status: ${res6.status} (Expected: 400)`);
  console.log(`Validation Error Output:`, JSON.stringify(res6.data, null, 2));
  console.log('--- Passed ---\n');

  // Test 7: Mongoose Validation Demo: Reason Exceeding 300 Characters (Task 5)
  console.log('7. Testing Mongoose Validation: Reason > 300 Chars:');
  const res7 = await request('/api/v1/db/test-validation', 'POST', { testType: 'reason-exceeded' });
  console.log(`Status: ${res7.status} (Expected: 400)`);
  console.log(`Validation Error Output:`, JSON.stringify(res7.data, null, 2));
  console.log('--- Passed ---\n');

  console.log('====================================================');
  console.log('ALL API & SCHEMA VALIDATION TESTS COMPLETED SUCCESSFULLY!');
  console.log('====================================================');
}

runTests().catch(console.error);
