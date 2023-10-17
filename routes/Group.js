const express = require('express');

const router = express.Router() // mini express app = Router\

const GroupAdmin = require('../Controllers/Group');

const authenticate = require('../middlewears');

router.post('/group/get-create',authenticate.authenticateToken,GroupAdmin.postAddGroup);

router.get('/group/get-groups',authenticate.authenticateToken,GroupAdmin.getGroups);

router.get('/group/get-new-groups',authenticate.authenticateToken,GroupAdmin.getNewGroups);  

router.get('/group/get-add-newUser',authenticate.authenticateToken,GroupAdmin.getAddNewUser);

router.get('/group/get-delete-User',authenticate.authenticateToken,GroupAdmin.getDeleteUser);

router.get('/group/get-change-admin',authenticate.authenticateToken,GroupAdmin.getChangeAdmin);

router.get('/group/check-for-admin',authenticate.authenticateToken,GroupAdmin.getCheckForAdmin);

module.exports = router;