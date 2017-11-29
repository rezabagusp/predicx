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

// run-predict?d={"matkul":"mat219","smt":"3","value":"2,3,7"}&v=1
app.get('/run-predict', function(req, res){
    /*
        data = {"matkul": nama_matkul, "smt": semester, "value": listofvalue(separate by comma)}

        ex:
            data = {
                "matkul": "mat219",
                "smt": "3",
                "value": "5,5,6"
            }
    */
    if(!req.query.d){
        res.json({status: false, message: "Please include data parameter (d)"});
    }else{
        data = JSON.parse(req.query.d);
        debug = false;
        if(req.query.v){
            debug = true;
        }

        if(debug){
            model = "smt"+data.smt+"_"+data.matkul+"_test";
        }else{
            model = "smt"+data.smt+"_"+data.matkul;        
        }
        value = data.value;

        py_options = {
            scriptPath: "../predictor/",
            mode: 'text',
            args: ["-m", model, "-d", value]    
        };

        pyshell.run('pred_NN_coba.py', py_options, function(err, result){
            if(err){
                res.json({status: false, message: err});
            }else{
                predicted = result[0].replace(/[\n\r]+/g, '');
                if(predicted.indexOf("No such model") !== -1)
                    res.send({status: false, message: 'Predicition failed: '+predicted});
                else
                    res.send({status: true, message: 'Prediction success!', results: predicted});
            }
        });
    }
})

module.exports = app;