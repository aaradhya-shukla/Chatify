const express = require('express');

const router = express.Router();

const userSignUpAdmin = require('../Controllers/SignUp');

router.post('/user/SignUp',userSignUpAdmin.postSignup);

module.exports = router;