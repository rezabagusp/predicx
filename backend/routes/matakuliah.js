var express = require('express'),
    matakuliah = require('../controllers/matakuliah.controller'),
    router = express.Router();

//routing auth
router.get('/prasyarat', function(req, res, next){
    console.log('masuk router')
    matakuliah.getSyarat(req, res);
});

router.get('/all', function(req, res, next){
    console.log('masuk router')
    matakuliah.getMatkul(req, res);
});


module.exports = router;
