const classes = require('../model/class');

function listClasses() {
  return classes.filter(c => c.active !== false);
}

function getClassDetails(id) {
  const cls = classes.find(c => c.id === Number(id) && c.active !== false);
  return cls || null;
}

function createClass({ title, description, instructor, dateTime, capacity }) {
  if (new Date(dateTime) <= new Date()) {
    return { error: 'Class date/time must be in the future' };
  }
  const cls = {
    id: classes.length + 1,
    title,
    description,
    instructor,
    dateTime,
    capacity,
    active: true,
    bookings: 0
  };
  classes.push(cls);
  return { message: 'Class created', class: cls };
}

function removeClass(id) {
  const cls = classes.find(c => c.id === Number(id));
  if (!cls) return { error: 'Class not found' };
  cls.active = false;
  return { message: 'Class removed' };
}

module.exports = { listClasses, getClassDetails, createClass, removeClass };
