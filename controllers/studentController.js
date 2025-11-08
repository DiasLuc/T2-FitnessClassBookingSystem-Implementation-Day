const studentService = require('../service/studentService');
const bookings = require('../model/booking');

exports.register = (req, res) => {
  const result = studentService.register(req.body);
  if (result.error) return res.status(400).json({ error: result.error });
  res.json(result);
};

exports.login = (req, res) => {
  const result = studentService.login(req.body);
  if (result.error) return res.status(401).json({ error: result.error });
  res.json(result);
};

exports.getBookings = (req, res) => {
  const studentId = req.user.id;
  const userBookings = studentService.getBookings(studentId, bookings);
  res.json(userBookings);
};
