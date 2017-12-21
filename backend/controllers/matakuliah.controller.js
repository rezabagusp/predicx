var express = require('express'),
    sequelize = require('../dbconnection');
var Auth = require('./authentication.controller');

var matakuliah = sequelize.import('./../models/mataKuliah.model');
var syaratmatakuliah = sequelize.import('./../models/syaratMataKuliah.model');
var suggestion = sequelize.import('./../models/suggestion.model');
var mahasiswa = sequelize.import('./../models/mahasiswa.model');

matakuliah.hasMany(syaratmatakuliah, {foreign_key: 'fk_mata_kuliah_id'});
syaratmatakuliah.belongsTo(matakuliah, {as: 'mk', foreignKey: 'fk_mata_kuliah_id', targetKey: 'id'});
matakuliah.hasMany(syaratmatakuliah, {foreign_key: 'syarat_mata_kuliah_id'});
syaratmatakuliah.belongsTo(matakuliah, {as: 'smk', foreignKey: 'syarat_mata_kuliah_id', targetKey: 'id'});

class MataKuliah{
    constructor(){}
    
    getSuggestion(req,res){
        var mhsInfo = Auth.tokenCheck(req.headers['authorization']);
        if(mhsInfo == null){
            res.status(401).json({status:false,messsage:"Authentication failed"});
        }else{
            var username = mhsInfo.nama_user;
        
            mahasiswa.findOne({
                where: {nama_user: username}
            }).then(function(mhs){
                suggestion.findAll({
                    where: {fk_mahasiswa_id: mhs.id, status: "PREDICTED"},
                    order: [['fk_nilai_mutu_id'], ['confidence','DESC']]
                }).then(function(suggest){
                    if(!suggest.length){
                        matakuliah.findAll({
                            where: {is_class: true}
                        }).then(function(matkul){
                            var mk = new Array();

                            for(var m in matkul){
                                mk[m] = {'fk_mahasiswa_id':mhs.id,'fk_mata_kuliah_id':matkul[m].id,status:'SUBMITTED'}
                            }

                            suggestion.bulkCreate(mk)
                                .then(function(){
                                    res.status(200).json({status:true,message:"Suggestion job has been submitted"});
                                })
                                .catch(function(err){
                                    res.status(500).json({status:false,message:"Suggestion job failed to submit"});
                                })
                        }).catch(function(err){
                            res.status(500).json({status:false,message:"Database error occured when operating table 'matakuliahs'"});                
                        });;
                    }else{
                        res.status(200).json({status:true,message:"New Suggestion jobs has been created",suggest:suggest});
                    }
                }).catch(function(err){
                    res.status(500).json({status:false,message:"Database error occured when operating table 'suggestions'"});                
                });
            }).catch(function(err){
                res.status(500).json({status:false,message:"Database error occured when operating table 'mahasiswas'"});
            })
        }
    }

    getPrasyarat(matkulId){
        return syaratmatakuliah.findAll({
            attributes: ['id'],
            include: [{model: matakuliah, as: 'mk', attributes: ['nama_mata_kuliah','kode_mata_kuliah', 'semester'], where: {id:matkulId}},{model: matakuliah, as: 'smk', attributes: ['nama_mata_kuliah','kode_mata_kuliah']}],
        }).then(function(data){
            return data;
        }).catch(function(err){
            return null;
        })
    }

    getMatkul(req,res){ //ambil matkul yang mau diprediksi
        var mhsInfo = Auth.tokenCheck(req.headers['authorization']);

        if(mhsInfo != null){
            matakuliah.findAll({
                where: {is_class: true, semester: {$lte: mhsInfo.smt}}
            }).then(function(data){
                res.status(200).json({status: true, message: "success", data: data});
            }).catch(function(err){
                res.status(500).json({status: false, message: "an error occured", err: err})
            })
        }else{
            res.status(401).json({status:false, message:"Authentication failed"});
        }
        
    }
}

module.exports = new MataKuliah;