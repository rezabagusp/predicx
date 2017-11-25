var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var pyshell = require('python-shell');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
    res.send('Hello World');
});

app.get('/run-predict', function(req, res){
    console.log(req.query);

    /*
        data = {"class": class, "value": listofvalue(separate by comma)}
    */

    data = JSON.parse(req.query.d);

    py_options = {
        scriptPath: "../predictor/",
        args: ["-m", "smt3_mat219_test", "-d", "5,5,6"]    
    };

    pyshell.run('pred_NN_coba.py', py_options, function(err, result){
        if(err)
            res.send(err);
        else
            res.send(result);
    });

    // res.send('nano');
})

module.exports = app;