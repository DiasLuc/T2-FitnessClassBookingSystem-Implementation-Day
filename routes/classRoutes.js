const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const authMiddleware = require('../service/authMiddleware');

router.get('/', classController.listClasses);
router.get('/:id', classController.getClassDetails);
router.post('/', authMiddleware.admin, classController.createClass);
router.delete('/:id', authMiddleware.admin, classController.removeClass);

module.exports = router;
