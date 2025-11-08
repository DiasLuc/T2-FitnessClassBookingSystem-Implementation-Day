require('dotenv').config();
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const baseURL = process.env.BASE_URL;
const classData = require('../fixtures/class.json');

let createdClassId;

describe('Feature #3 – List All Available Classes (Public)', function() {
  it('A: Retrieve list of classes without authentication', async function() {
    const res = await request(baseURL)
      .get('/api/classes');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('B: Retrieve list when no classes are available', async function() {
    // This test assumes the system can be reset or all classes removed, which is not implemented here
    // Skipped for now
    this.skip();
  });

  it('C: Verify each class displays required fields', async function() {
    const res = await request(baseURL)
      .get('/api/classes');
    if (res.body.length > 0) {
      const cls = res.body[0];
      expect(cls).to.have.all.keys('id', 'title', 'description', 'instructor', 'dateTime', 'capacity', 'active', 'bookings');
    }
  });
});

describe('Feature #4 – Get Class Details (Public)', function() {
  before(async function() {
    // Create a class for detail tests
    const adminData = require('../fixtures/admin.json')[0];
    const loginRes = await request(baseURL)
      .post('/api/admins/login')
      .send(adminData);
    const adminToken = loginRes.body.token;
    const res = await request(baseURL)
      .post('/api/classes')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(classData[0]);
    createdClassId = res.body.class.id;
  });

  it('A: Retrieve details for existing active class', async function() {
    const res = await request(baseURL)
      .get(`/api/classes/${createdClassId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id', createdClassId);
  });

  it('B: Retrieve details for non-existent class', async function() {
    const res = await request(baseURL)
      .get('/api/classes/99999');
    expect(res.status).to.equal(404);
  });

  it('C: Retrieve details for inactive class', async function() {
    // Remove the class
    const adminData = require('../fixtures/admin.json')[0];
    const loginRes = await request(baseURL)
      .post('/api/admins/login')
      .send(adminData);
    const adminToken = loginRes.body.token;
    await request(baseURL)
      .delete(`/api/classes/${createdClassId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    const res = await request(baseURL)
      .get(`/api/classes/${createdClassId}`);
    expect(res.status).to.equal(404);
  });
});
