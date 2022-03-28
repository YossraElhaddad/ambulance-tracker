const express = require('express');
const router = express.Router();
const { createUser, userSignIn } = require('../controllers/user');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middlewares/validation/user');
const {hospitalData} = require('../models/hospitals');
const {getEstimatedArrivalTime} = require('../controllers/time');
//const axios = require('axios');

router.post('/registration', validateUserSignUp, userValidation, createUser);
router.post('/login', validateUserSignIn, userValidation, userSignIn);
router.get('/hospitals',hospitalData,getEstimatedArrivalTime);


module.exports = router;
