var express = require('express'),
    multer = require('multer'),
	mahasiswa = require('./../controller/mahasiswa.controller'),
    router = express.Router(),
	path = require('path'),
	fs = require('fs'),
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

module.exports = router;