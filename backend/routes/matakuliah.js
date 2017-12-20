var express = require('express'),
    matakuliah = require('../controllers/matakuliah.controller'),
    router = express.Router();

//routing auth
router.get('/all', function(req, res, next){
    console.log('masuk router')
    matakuliah.getMatkul(req, res);
});

router.get('/suggestion', function(req, res, next){
    matakuliah.getSuggestion(req, res);
});


module.exports = router;
