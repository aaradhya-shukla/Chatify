const express = require('express');

const router = express.Router();

const chatAdmin = require('../Controllers/chat');

const authenticate = require('../middlewears');

router.get('/user/get-chat',authenticate.authenticateToken,chatAdmin.getChats);

router.post('/user/send-msg',authenticate.authenticateToken,chatAdmin.postSendmsg);

router.get('/user/get-users',chatAdmin.getUsers);

router.get('/user/get-new-msg',chatAdmin.getNewMessages);

router.get('/user/log-off',authenticate.authenticateToken,chatAdmin.getLogOff);

router.get('/user/get-new-users',authenticate.authenticateToken,chatAdmin.getNewUsers)

router.post('/user/send-File',authenticate.authenticateToken,chatAdmin.getSendFile);

module.exports = router 