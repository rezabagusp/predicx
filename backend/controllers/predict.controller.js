var express = require('express'),
	sequelize = require('../dbconnection'),
    pyshell = require('python-shell');    

class Predictor{

    constructor(){}
    
    // predict/run-predict?d={"matkul":"mat219","smt":"3","value":"2,3,7"}&v=1
    run_predict(req, res){
        console.log('masuk run predict ')
        // run-predict?d={"matkul":"mat219","smt":"3","value":"2,3,7"}&v=1
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
            var data = JSON.parse(req.query.d);
            var debug = false;
            if(req.query.v){
                debug = true;
            }

            if(debug){
                var model = "smt"+data.smt+"_"+data.matkul+"_test";
            }else{
                var model = "smt"+data.smt+"_"+data.matkul;        
            }
            var value = data.value;

            var py_options = {
                scriptPath: "../predictor/",
                mode: 'json',
                args: ["-m", model, "-d", value]    
            };

            pyshell.run('pred_NN_coba.py', py_options, function(err, result){
                if(err){
                    res.json({status: false, message: err});
                }else{
                    // res.send(result[0]);
                    let predicted = result[0];
                    if(predicted.message.indexOf("No such model") !== -1)
                        res.json({status: false, message: 'Predicition failed: '+predicted.message});
                    else
                        res.json({status: true, message: 'Prediction success!', results: predicted});
                }
            });
        }
        
    }

}

module.exports = new Predictor;