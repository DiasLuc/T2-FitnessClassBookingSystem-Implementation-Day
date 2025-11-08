const admins = require('../model/admin');
const jwt = require('jsonwebtoken');
const { SECRET } = require('./authMiddleware');

function register({ username, password }) {
  if (admins.find(a => a.username === username)) {
    return { error: 'Username already exists' };
  }
  const admin = { id: admins.length + 1, username, password };
  admins.push(admin);
  return { message: 'Admin registration successful', admin };
}

function login({ username, password }) {
  const admin = admins.find(a => a.username === username && a.password === password);
  if (!admin) return { error: 'Invalid credentials' };
  const token = jwt.sign({ id: admin.id, role: 'admin', username }, SECRET, { expiresIn: '1h' });
  return { message: 'Login successful', token };
}

module.exports = { register, login };
