const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../service/authMiddleware');

router.post('/register', studentController.register);
router.post('/login', studentController.login);
router.get('/bookings', authMiddleware.student, studentController.getBookings);

module.exports = router;
