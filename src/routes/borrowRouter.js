const express = require('express');
const router = express.Router();

const borrowController = require('../controllers/borrowController');

router.get('/', borrowController.list);

module.exports = router;