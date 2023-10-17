const express = require('express');

const router = express.Router() // mini express app = Router\

const GroupAdmin = require('../Controllers/Group');

const authenticate = require('../middlewears');

router.post('/group/get-create',GroupAdmin.postAddGroup);

router.get('/group/get-groups',authenticate.authenticateToken,GroupAdmin.getGroups);

router.get('/group/get-new-groups',authenticate.authenticateToken,GroupAdmin.getNewGroups);  

module.exports = router;