var express = require('express'),
	auth = require('../controllers/authentication.controller'),
    router = express.Router();

//routing auth
router.post('/login-ldap', function(req, res, next){
    console.log('masuk router')
    auth.login_ldap(req, res);
});


module.exports = router;
