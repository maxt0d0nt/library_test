const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');

router.get('/', borrowController.list);
router.get('/:id', borrowController.delete);

module.exports = router;