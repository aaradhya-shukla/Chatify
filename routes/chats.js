const express = require('express');

const router = express.Router();

const chatAdmin = require('../Controllers/chat');

const authenticate = require('../middlewears');

router.get('/user/get-chat',authenticate.authenticateToken,chatAdmin.getChats);

router.post('/user/send-msg',authenticate.authenticateToken,chatAdmin.postSendmsg);

module.exports = router