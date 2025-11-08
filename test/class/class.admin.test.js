require('dotenv').config();
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const baseURL = process.env.BASE_URL;
const adminData = require('../fixtures/admin.json');
const classData = require('../fixtures/class.json');
let adminToken;
let createdClassId;

describe('Feature #9 – Create a New Class (Admin Login Needed)', function() {
  before(async function() {
    // Login as admin
    const res = await request(baseURL)
      .post('/api/admins/login')
      .send(adminData[0]);
    adminToken = res.body.token;
  });

  it('A: Create class with valid admin JWT and valid data', async function() {
    const res = await request(baseURL)
      .post('/api/classes')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(classData[1]);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('class');
    createdClassId = res.body.class.id;
  });

  it('B: Create class without authentication', async function() {
    const res = await request(baseURL)
      .post('/api/classes')
      .send(classData[1]);
    expect(res.status).to.equal(401);
  });

  it('C: Create class with missing required fields', async function() {
    const res = await request(baseURL)
      .post('/api/classes')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: '', description: '', instructor: '', dateTime: '', capacity: null });
    expect(res.status).to.be.oneOf([400, 422]);
  });

  it('D: Create class with past date/time', async function() {
    const res = await request(baseURL)
      .post('/api/classes')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ ...classData[1], dateTime: '2020-01-01T10:00:00Z' });
    expect(res.status).to.equal(400);
  });
});

describe('Feature #10 – Remove Class (Admin Login Needed)', function() {
  it('A: Remove existing class with valid admin JWT', async function() {
    const res = await request(baseURL)
      .delete(`/api/classes/${createdClassId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).to.equal(200);
  });

  it('B: Remove class without authentication', async function() {
    const res = await request(baseURL)
      .delete(`/api/classes/${createdClassId}`);
    expect(res.status).to.equal(401);
  });

  it('C: Remove class with invalid or student JWT', async function() {
    // Get student JWT
    const studentData = require('../fixtures/student.json')[0];
    const loginRes = await request(baseURL)
      .post('/api/students/login')
      .send(studentData);
    const studentToken = loginRes.body.token;
    const res = await request(baseURL)
      .delete(`/api/classes/${createdClassId}`)
      .set('Authorization', `Bearer ${studentToken}`);
    expect(res.status).to.equal(401);
  });

  it('D: Access a removed class', async function() {
    const res = await request(baseURL)
      .get(`/api/classes/${createdClassId}`);
    expect(res.status).to.equal(404);
  });
});
