const students = require('../model/student');
const jwt = require('jsonwebtoken');
const { SECRET } = require('./authMiddleware');

function register({ username, password }) {
  if (students.find(s => s.username === username)) {
    return { error: 'Username already exists' };
  }
  const student = { id: students.length + 1, username, password };
  students.push(student);
  return { message: 'Registration successful', student };
}

function login({ username, password }) {
  const student = students.find(s => s.username === username && s.password === password);
  if (!student) return { error: 'Invalid credentials' };
  const token = jwt.sign({ id: student.id, role: 'student', username }, SECRET, { expiresIn: '1h' });
  return { message: 'Login successful', token };
}

function getBookings(studentId, bookings) {
  return bookings.filter(b => b.studentId === studentId);
}

module.exports = { register, login, getBookings };
