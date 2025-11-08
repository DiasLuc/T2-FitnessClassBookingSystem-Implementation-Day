require('dotenv').config();
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const baseURL = process.env.BASE_URL;
const studentData = require('../fixtures/student.json');
let jwtToken;

describe('Feature #1 - Student Registration', function() {
  it('A: Register with unique username and valid password', async function() {
    const res = await request(baseURL)
      .post('/api/students/register')
      .send(studentData[0]);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('student');
    expect(res.body.student.username).to.equal(studentData[0].username);
  });

  it('B: Register with existing username', async function() {
    const res = await request(baseURL)
      .post('/api/students/register')
      .send(studentData[0]);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message');
  });

  it('C: Register with missing required info', async function() {
    const res = await request(baseURL)
      .post('/api/students/register')
      .send({ username: '' });
    expect(res.status).to.be.oneOf([400, 422]);
  });
});

describe('Feature #2 – Student Login with JWT', function() {
  it('A: Login with valid credentials', async function() {
    const res = await request(baseURL)
      .post('/api/students/login')
      .send(studentData[0]);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    jwtToken = res.body.token;
  });

  it('B: Login with invalid credentials', async function() {
    const res = await request(baseURL)
      .post('/api/students/login')
      .send({ username: 'wrong', password: 'wrong' });
    expect(res.status).to.equal(401);
  });

  it('C: Access protected route without JWT', async function() {
    const res = await request(baseURL)
      .get('/api/students/bookings');
    expect(res.status).to.equal(401);
  });

  it('D: Access protected route with invalid JWT', async function() {
    const res = await request(baseURL)
      .get('/api/students/bookings')
      .set('Authorization', 'Bearer invalidtoken');
    expect(res.status).to.equal(401);
  });
});

describe('Feature #6 – View Current User’s Bookings', function() {
  before(async function() {
    // Login and get JWT
    const res = await request(baseURL)
      .post('/api/students/login')
      .send(studentData[0]);
    jwtToken = res.body.token;
  });

  it('A: View bookings with valid JWT', async function() {
    const res = await request(baseURL)
      .get('/api/students/bookings')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('B: View bookings without authentication', async function() {
    const res = await request(baseURL)
      .get('/api/students/bookings');
    expect(res.status).to.equal(401);
  });

  it('C: Verify order of bookings in response', async function() {
    const res = await request(baseURL)
      .get('/api/students/bookings')
      .set('Authorization', `Bearer ${jwtToken}`);
    if (res.body.length > 1) {
      for (let i = 1; i < res.body.length; i++) {
        expect(new Date(res.body[i].dateTime) >= new Date(res.body[i-1].dateTime)).to.be.true;
      }
    }
  });
});
