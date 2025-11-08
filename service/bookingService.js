const bookings = require('../model/booking');
const classes = require('../model/class');

function bookClass(studentId, classId) {
  const cls = classes.find(c => c.id === Number(classId) && c.active !== false);
  if (!cls) return { error: 'Class not found or inactive' };
  if (cls.bookings >= cls.capacity) return { error: 'Class is full' };
  if (bookings.find(b => b.studentId === studentId && b.classId === classId)) {
    return { error: 'Already booked' };
  }
  bookings.push({ id: bookings.length + 1, studentId, classId, dateTime: cls.dateTime });
  cls.bookings++;
  return { message: 'Booking successful' };
}

function cancelBooking(studentId, classId) {
  const idx = bookings.findIndex(b => b.studentId === studentId && b.classId === classId);
  if (idx === -1) return { error: 'Booking not found' };
  bookings.splice(idx, 1);
  const cls = classes.find(c => c.id === Number(classId));
  if (cls) cls.bookings--;
  return { message: 'Booking cancelled' };
}

module.exports = { bookClass, cancelBooking };
