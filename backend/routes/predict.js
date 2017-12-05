var express = require('express'),
	predict = require('../controllers/predict.controller'),
    router = express.Router();

//routing auth
router.get('/run-predict', function(req, res, next){
    console.log('masuk predict routes')
    predict.run_predict(req, res);
});

router.get('/test-join', function(req, res, next){
    // console.log('masuk predict routes')
    predict.test_join(req, res);
});


module.exports = router;
