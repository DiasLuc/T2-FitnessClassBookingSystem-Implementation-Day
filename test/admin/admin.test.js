require('dotenv').config();
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const baseURL = process.env.BASE_URL;
const adminData = require('../fixtures/admin.json');
let adminToken;

describe('Feature #7 – Admin Registration', function() {
  it('A: Register new admin with unique username and valid info', async function() {
    const res = await request(baseURL)
      .post('/api/admins/register')
      .send(adminData[0]);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('admin');
    expect(res.body.admin.username).to.equal(adminData[0].username);
  });

  it('B: Register admin with existing username', async function() {
    const res = await request(baseURL)
      .post('/api/admins/register')
      .send(adminData[0]);
    expect(res.status).to.equal(400);
  });

  it('C: Register admin with missing required fields', async function() {
    const res = await request(baseURL)
      .post('/api/admins/register')
      .send({ username: '' });
    expect(res.status).to.be.oneOf([400, 422]);
  });
});

describe('Feature #8 – Admin Login with JWT', function() {
  it('A: Log in with valid admin credentials', async function() {
    const res = await request(baseURL)
      .post('/api/admins/login')
      .send(adminData[0]);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    adminToken = res.body.token;
  });

  it('B: Log in with invalid admin credentials', async function() {
    const res = await request(baseURL)
      .post('/api/admins/login')
      .send({ username: 'wrong', password: 'wrong' });
    expect(res.status).to.equal(401);
  });

  it('C: Access admin-only route without JWT', async function() {
    const res = await request(baseURL)
      .post('/api/classes')
      .send({ title: 'Test', description: 'Test', instructor: 'Test', dateTime: '2025-12-01T10:00:00Z', capacity: 10 });
    expect(res.status).to.equal(401);
  });

  it('D: Access admin-only route with student JWT', async function() {
    // Get student JWT
    const studentData = require('../fixtures/student.json')[0];
    const loginRes = await request(baseURL)
      .post('/api/students/login')
      .send(studentData);
    const studentToken = loginRes.body.token;
    const res = await request(baseURL)
      .post('/api/classes')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ title: 'Test', description: 'Test', instructor: 'Test', dateTime: '2025-12-01T10:00:00Z', capacity: 10 });
    expect(res.status).to.equal(401);
  });
});
