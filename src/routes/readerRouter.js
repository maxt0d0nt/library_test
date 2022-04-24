const express = require('express');
const router = express.Router();
const validateCreateReader = require('../validators/readerValidator');
const readerController = require('../controllers/readerController');

router.get('/', readerController.list);
router.post('/', validateCreateReader, readerController.add);
router.get('/deleteReader/:id', readerController.delete)
router.get('/editReader/:id', readerController.edit)
router.post('/editReader/:id', readerController.update)


module.exports = router;