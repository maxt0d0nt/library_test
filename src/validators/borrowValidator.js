const { body } = require ('express-validator');

const validateCreateBorrow = [
    body('id').notEmpty(),
    body('title').notEmpty(),
    body('author').notEmpty(),
    body('isbn').notEmpty(),
    body('reader_id').notEmpty().withMessage('Please write the reader ID'),

    ];

    module.exports = validateCreateBorrow;
