require('dotenv').config();
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const baseURL = process.env.BASE_URL;
const testData = require('../fixtures/student-login.json');
let jwtToken;

before(async function() {
  // Register users for login tests
  await request(baseURL).post('/api/students/register').send(testData[0]);
  await request(baseURL).post('/api/students/register').send(testData[1]);
});

describe('Feature #2 – Student Login with JWT', function() {
  it('A: Log in with valid username and password', async function() {
    const res = await request(baseURL)
      .post('/api/students/login')
      .send(testData[0]);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    jwtToken = res.body.token;
  });

  it('B: Log in with invalid username or password', async function() {
    const res = await request(baseURL)
      .post('/api/students/login')
      .send(testData[2]);
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('error');
  });

  it('C: Access protected route without JWT', async function() {
    const res = await request(baseURL)
      .get('/api/students/bookings');
    expect(res.status).to.equal(401);
  });

  it('D: Access protected route with expired or invalid JWT', async function() {
    const res = await request(baseURL)
      .get('/api/students/bookings')
      .set('Authorization', 'Bearer invalidtoken');
    expect(res.status).to.equal(401);
  });
});
