const { body } = require ('express-validator');

const validateCreateReader = [
    body('name_').notEmpty().withMessage('Please write a name'),
    body('surname').notEmpty().withMessage('Please write a surname'),
    body('Email').notEmpty().withMessage('Please write a email'),
    body('PhoneNumber').notEmpty().withMessage('Please write a phone'),

    ];

    module.exports = validateCreateReader;