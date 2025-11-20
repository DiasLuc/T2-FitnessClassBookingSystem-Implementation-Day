require('dotenv').config();
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const baseURL = process.env.BASE_URL;
const testData = require('../fixtures/student-registration.json');

describe('Feature #1 - Student Registration', function() {
  it('A: Register with unique username and valid password', async function() {
    const res = await request(baseURL)
      .post('/api/students/register')
      .send(testData[0]);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('student');
    expect(res.body.student.username).to.equal(testData[0].username);
  });

  it('A: Register with another unique username and valid password', async function() {
    const res = await request(baseURL)
      .post('/api/students/register')
      .send(testData[1]);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('student');
    expect(res.body.student.username).to.equal(testData[1].username);
  });

  it('B: Register with existing username', async function() {
    const res = await request(baseURL)
      .post('/api/students/register')
      .send(testData[2]);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('C: Register with missing username', async function() {
    const res = await request(baseURL)
      .post('/api/students/register')
      .send(testData[3]);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.not.equal('Username already exists');
    expect(res.status).to.equal(400);
  });

  it('C: Register with missing password', async function() {
    const res = await request(baseURL)
      .post('/api/students/register')
      .send(testData[4]);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.not.equal('Username already exists');
    expect(res.status).to.equal(400);
  });
});
