require('dotenv').config();
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const baseURL = process.env.BASE_URL;
const studentData = require('../fixtures/student.json');
const bookingData = require('../fixtures/booking.json');
let jwtToken;

before(async function() {
  // Register and login student for booking tests
  await request(baseURL).post('/api/students/register').send(studentData[1]);
  const res = await request(baseURL)
    .post('/api/students/login')
    .send(studentData[1]);
  jwtToken = res.body.token;
});

describe('Feature #5 – Book and Cancel Spots (Student Login Needed)', function() {
  it('A: Book a class with valid JWT and available spots', async function() {
    const res = await request(baseURL)
      .post('/api/bookings/book')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(bookingData[0]);
    expect(res.status).to.equal(200);
  });

  it('B: Book a class without authentication', async function() {
    const res = await request(baseURL)
      .post('/api/bookings/book')
      .send(bookingData[0]);
    expect(res.status).to.equal(401);
  });

  it('C: Book a full class', async function() {
    // This test assumes the class is full, which is not implemented here
    this.skip();
  });

  it('D: Book the same class twice', async function() {
    await request(baseURL)
      .post('/api/bookings/book')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(bookingData[0]);
    const res = await request(baseURL)
      .post('/api/bookings/book')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(bookingData[0]);
    expect(res.status).to.equal(400);
  });

  it('E: Cancel a booking successfully', async function() {
    const res = await request(baseURL)
      .post('/api/bookings/cancel')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(bookingData[0]);
    expect(res.status).to.equal(200);
  });
});
