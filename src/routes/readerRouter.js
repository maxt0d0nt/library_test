const express = require('express');
const router = express.Router();

const readerController = require('../controllers/readerController');

router.get('/', readerController.list);
router.post('/addReader', readerController.add);
router.get('/deleteReader/:id', readerController.delete)
router.get('/editReader/:id', readerController.edit)
router.post('/editReader/:id', readerController.update)

module.exports = router;