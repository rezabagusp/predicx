var express = require('express');
var crypton = require('crypto');
var router = express.Router();

/* GET users listing. */
router.get('', function(req, res, next) {
  res.send(crypto.createHash('sha256').update('student').digest('hex'));
});

module.exports = router;
