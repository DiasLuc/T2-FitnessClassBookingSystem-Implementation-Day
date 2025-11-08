const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../service/authMiddleware');

router.post('/book', authMiddleware.student, bookingController.bookClass);
router.post('/cancel', authMiddleware.student, bookingController.cancelBooking);

module.exports = router;
