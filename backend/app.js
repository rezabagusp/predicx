var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var pyshell = require('python-shell');
var fetch = require('node-fetch');

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
});

function ldap_auth(username, password){
    let url = "http://ng.rajamuda.web.id/ldap_auth.php?username="+username+"&password="+password;

    return fetch(url)
        .then(mhs => {
            return mhs.text();
        })
}

app.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    ldap_auth(username, password)
        .then(data => {
            if(data.indexOf('null') !== -1){
                res.json({status: false, message: 'wrong username or password'});
            }else{
                data = JSON.parse(data);
                
                let d = new Date();
                let name = data.cn['0'];
                let nim = data.nrp['0'];
                let tahun_masuk = data.angkatan['0'];
                let angkatan = parseInt(data.angkatan['0'])-1963;
                let semester = null;
                if(d.getMonth() >= 2 && d.getMonth() <= 8){
                    semester = (d.getFullYear()-parseInt(data.angkatan['0']))*2;
                }else{
                    semester = (d.getFullYear()-parseInt(data.angkatan['0']))*2 + 1;                    
                }

                let mhs_info = {
                    name: name,
                    nim: nim,
                    tahun_masuk: tahun_masuk,
                    angkatan: angkatan,
                    semester: semester
                }
                
                res.json({status: true, message: 'login success', mhs_info: mhs_info});
            }
        });
});

module.exports = app;