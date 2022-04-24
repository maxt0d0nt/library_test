const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validateCreateForm = require('../validators/bookValidator');


router.get('/', bookController.list);
router.post('/', validateCreateForm ,bookController.add);
router.get('/deleteBook/:id', bookController.delete)
router.get('/editBook/:id', bookController.edit)
router.post('/editBook/:id', bookController.update)
router.get('/borrowBook/:id', bookController.borrow)
router.post('/borrowBook', bookController.loan)

module.exports = router;