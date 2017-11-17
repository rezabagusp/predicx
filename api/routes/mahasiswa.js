var express = require('express'),


    multer = require('multer'),
	mahasiswa = require('./../controller/mahasiswa.controller'),
    router = express.Router(),
	path = require('path'),
	fs = require('fs')
    storage = multer.diskStorage({
	    destination: function (req, file, callback) {
	        callback(null, 'public/images');
	    },
	    filename: function (req, file, callback) {
	    let ext = path.extname(file.originalname);
	        callback(null, `${Math.random().toString(36).substring(7)}${ext}`);
	    }
	}),
	upload = multer({ storage : storage, 
		fileFilter: function (req, file, callback) {
			var ext = path.extname(file.originalname);
			if(ext !== '.png' && ext !== '.PNG' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.pdf' && ext !== '.PDF') {
				return callback(new Error('file not allowed'));
			}
			callback(null, true);
		}
	}).any();        



router.post('/addekskul', function(req, res, next){
    mahasiswa.addEkskul(req,res);
});
router.post('/deleteekskul', function(req, res, next){
    mahasiswa.deleteEkskul(req,res);
});
router.post('/updateekskul', function(req, res, next){
    mahasiswa.updateEkskul(req, res);
});
router.get('/getallekskul/:id_mahasiswa', function(req, res, next){
	mahasiswa.getAllEkskul(req, res);
});

//for init form
router.get('/getsubkategori', function(req, res, next){
	mahasiswa.getSubKategori(req, res);
});
router.get('/getkategori', function(req, res, next){
	mahasiswa.getKategori(req, res);
});
router.get('/gettingkat', function(req, res, next){
	mahasiswa.getTingkat(req, res);
});


router.post('/getekskul', function(req, res, next){// for detail ekskul
	mahasiswa.getEkskulByID(req, res);
})

router.post('/upload', function(req, res, nect){
	mahasiswa.fileUpload(req, res);
})

router.post('/asset', function(request, response){
  var tempFile="public/images/3joy7v.pdf";
  fs.readFile(tempFile, function (err,data){
	 response.contentType("application/pdf");
	 console.log(data);
     response.send(data);
  });
});

router.post('/submitekskul', function(req, res, next){// for detail ekskul
	mahasiswa.submitEkskul(req, res);
})

router.post('/updateprofil', function(req, res, next){// for detail ekskul
	mahasiswa.updateProfil(req, res);
})
module.exports = router;