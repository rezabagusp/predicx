var express = require('express'),
	auth = require('../controller/authentication.controller'),
    router = express.Router();
//routing buat login
router.post('/masuk', function(req, res, next){
    auth.login(req.body, res);
});

router.get('/auth2', function(req, res, next){
    auth.auth2(req, res);
});

router.get('/logoutauth2', function(req, res, next){
    auth.logoutAuth2(req, res);
});

router.get('/openssopage', function(req, res, next){
    auth.openSsoPage(req, res);
});


module.exports = router;
