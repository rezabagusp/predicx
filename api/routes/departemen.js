var express = require('express'),
    multer = require('multer'),
	departemen = require('./../controller/departemen.controller'),
    mailer = require('./../controller/mailer.controller'),
    router = express.Router();  
var createPDF = require('./../dist/assets/public/images/createPDF.controller')


//routing departemen
router.post('/verifikasiekskul', function(req, res, next){
    departemen.verifikasiEkskul(req, res)
});
router.get('/getallpresma/:id_departemen', function(req, res, next){
    departemen.getAllpresma(req, res)
});

router.get('/detilprestasi/:id_ekskul', function(req, res, next){
    departemen.getPresmaById(req, res);
});

router.get('/getsummary/:id_departemen', function(req, res, next){
    departemen.getSummary(req, res);
});



//routing fakultas : departemen ke 9
router.get('/getallmahasiswa', function(req, res, next){
    departemen.getAllMahasiswa(req, res);
});

router.get('/getmahasiswa/:nim', function(req, res, next){
    departemen.getMahasiswa(req, res);
});

router.get('/getmutu/:jumlah_skor', function(req, res, next){
    departemen.getMutu(req, res);
});

router.post('/downloadipe', function(req, res, next){
    createPDF.CreateGeneratePDF(req, res);
});

router.get('/getalldepartemen', function(req, res, next){
    departemen.getAllDepartemen(req, res);
});

router.get('/getalldetailipemahasiswa/:nim', function(req, res, next){
    departemen.getAllDetailIPEMahasiswa(req, res);
});

router.post('/postpencarian', function(req, res, next){
    departemen.postPencarian(req, res);
});

module.exports = router;