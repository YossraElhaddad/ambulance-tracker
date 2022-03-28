const {check, validationResult} = require('express-validator');

//validates the user's inputs during registration
exports.validateUserSignUp = [
    check('name')
     .trim()
     .not().isEmpty().withMessage('Name Cannot be empty')
     .isLength({min: 3, max: 20}).withMessage('Name must be between 3 to 20 characters'),
    check('email')
     .normalizeEmail()
     .not().isEmpty().withMessage('Email Cannot be empty')
     .isEmail()
     .withMessage('Invalid Email'),
     check('id')
     .trim()
     .not().isEmpty().withMessage('ID Cannot be empty')
     .isNumeric().withMessage('ID must only contain numbers')
     .isLength({min: 14, max: 14}).withMessage('ID must be 14 digits'),
     check('dateOfBirth')
     .trim()
     .not().isEmpty().withMessage('Date of Birth Cannot be empty')
     .isDate().withMessage('Date of birth has wrong format')
     .isLength({min: 10, max: 10}).withMessage('Date of Birth must be 10 digits'),
    check('password')
     .trim()
     .not().isEmpty().withMessage('Password Cannot be empty')
     .isLength({min: 8, max: 20}).withMessage('Password must be between 8 to 20 characters'),
    check('confirmPassword')
     .trim().not().isEmpty().withMessage('Confirm Password Cannot be empty')
     .custom((val , {req}) =>{
        if(val !== req.body.password){
            throw new Error("Password and Confirm password do not match");
        }
        return true;
    })
];

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array();
    if(!result.length) return next();
    const error = result[0].msg;
    res.json({success: false , message: error});
};

//validates the user's inputs during login
exports.validateUserSignIn = [
    check('email').trim().isEmail().withMessage("Valid Email required"),
    check('password').trim().not().isEmpty().withMessage('Password required')
];