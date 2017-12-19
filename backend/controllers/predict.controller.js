var express = require('express'),
	sequelize = require('../dbconnection'),
    pyshell = require('python-shell');    
var Auth = require('./authentication.controller');
var Matkul = require('./matakuliah.controller');

var mahasiswa = sequelize.import('./../models/mahasiswa.model');
var historyMataKuliah = sequelize.import('./../models/historyMataKuliah.model');
var matakuliah = sequelize.import('./../models/mataKuliah.model');
var nilaiMutu = sequelize.import('./../models/nilaiMutu.model');

mahasiswa.hasMany(historyMataKuliah, {foreignKey: 'fk_mahasiswa_id'});
historyMataKuliah.belongsTo(mahasiswa, {foreignKey: 'fk_mahasiswa_id', targetKey: 'id'});
matakuliah.hasMany(historyMataKuliah, {foreignKey: 'fk_mata_kuliah_id'});
historyMataKuliah.belongsTo(matakuliah, {foreignKey: 'fk_mata_kuliah_id', targetKey: 'id'});
nilaiMutu.hasMany(historyMataKuliah, {foreignKey: 'fk_nilai_mutu_id'});
historyMataKuliah.belongsTo(nilaiMutu, {foreignKey: 'fk_nilai_mutu_id', targetKey: 'id'});

class Predictor{

    constructor(){}

    predict(req, res){
        var mhsInfo = Auth.tokenCheck(req.headers['authorization']);
        var mkToPredictId = req.query.mkid;
        var jamBelajar = req.query.studyhour;

        if(mhsInfo !== null){
            Matkul.getPrasyarat(mkToPredictId)
                .then(data => {
                    var listPrasyarat = new Array();
                    var semester = data[0].mk.semester;
                    var kodemk = data[0].mk.kode_mata_kuliah;
                             
                    for(var l in data){
                        listPrasyarat[l] = data[l].smk.kode_mata_kuliah;
                    }
   
                    mahasiswa.findOne({
                        where: {nama_user: mhsInfo.nama_user}
                    }).then(function(mhs){
                        historyMataKuliah.findAll({
                            include: [{model: mahasiswa, attributes: ['nama_user', 'nama_mahasiswa', 'nim_mahasiswa']}, {model: matakuliah, attributes: ['kode_mata_kuliah', 'nama_mata_kuliah', 'semester']}, {model: nilaiMutu, attributes: ['huruf_mutu']}],
                            where: {fk_mahasiswa_id: mhs.id}
                        }).then(function(matkul){
                            var mk = new Array();
                            var mutu = {'E':0, 'D':1, 'C':2, 'BC':3, 'B':4, 'AB':5, 'A':6};
                            for(var l in listPrasyarat){
                                let i = matkul.findIndex(x => x.mataKuliah.kode_mata_kuliah == listPrasyarat[l]);
                                mk[l] = mutu[matkul[i].nilaiMutu.huruf_mutu];
                            }
                            // console.log(mk);
                            let model = "smt"+semester+"_"+kodemk;
                            let value = mk.join()+","+jamBelajar;
                            let py_options = {
                                scriptPath: __dirname+"/../../predictor/",
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
                                        res.status(500).json({status: false, message: 'Predicition failed: '+predicted.message});
                                    else
                                        res.status(200).json({status: true, message: 'Prediction success!', results: predicted});
                                }
                            });
                            // res.status(200).json(matkul);
                        }).catch(function(err){
                            res.status(500).json({status:false, message:"An error occured", err: err});
                        });
                    }).catch(function(err){
                        res.status(500).json({status:false, message:"An error occured", err: err});
                    });
                });
        }else{
            res.status(401).json({status: false, message: "Authentication failed, Login again!"});
        }
    }
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
            res.status(400).json({status: false, message: "Please include data parameter (d)"});
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
                        res.status(500).json({status: false, message: 'Predicition failed: '+predicted.message});
                    else
                        res.status(200).json({status: true, message: 'Prediction success!', results: predicted});
                }
            });
        }
        
    }

}

module.exports = new Predictor;