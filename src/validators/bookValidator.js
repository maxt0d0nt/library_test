const { body } = require ('express-validator');

const validateCreateForm = [
    body('title').notEmpty().withMessage('Please write a Title'),
    body('author').notEmpty().withMessage('Please write a author'),
    body('isbn').notEmpty().withMessage('Please write a isbn'),

    ];

    module.exports = validateCreateForm;
