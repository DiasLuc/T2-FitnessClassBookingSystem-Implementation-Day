const bookingService = require('../service/bookingService');

exports.bookClass = (req, res) => {
  const studentId = req.user.id;
  const { classId } = req.body;
  const result = bookingService.bookClass(studentId, classId);
  if (result.error) return res.status(400).json({ error: result.error });
  res.json(result);
};

exports.cancelBooking = (req, res) => {
  const studentId = req.user.id;
  const { classId } = req.body;
  const result = bookingService.cancelBooking(studentId, classId);
  if (result.error) return res.status(400).json({ error: result.error });
  res.json(result);
};
