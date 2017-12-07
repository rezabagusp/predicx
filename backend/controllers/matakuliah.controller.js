var express = require('express'),
    sequelize = require('../dbconnection');

var matakuliah = sequelize.import('./../models/mataKuliah.model');
var syaratmatakuliah = sequelize.import('./../models/syaratMataKuliah.model');

matakuliah.hasMany(syaratmatakuliah, {foreign_key: 'fk_mata_kuliah_id'});
syaratmatakuliah.belongsTo(matakuliah, {as: 'mk', foreignKey: 'fk_mata_kuliah_id', targetKey: 'id'});
matakuliah.hasMany(syaratmatakuliah, {foreign_key: 'syarat_mata_kuliah_id'});
syaratmatakuliah.belongsTo(matakuliah, {as: 'smk', foreignKey: 'syarat_mata_kuliah_id', targetKey: 'id'});

class MataKuliah{
    constructor(){}

    // matkul/prasyarat?mid=1
    getSyarat(req,res){ //ambil prasyarat matkul
        if(!req.query.mid){
            res.json({status: false, message: "please include parameter 'mid' as mata kuliah id"});
        }else{
            var matkul_id = req.query.mid;
            syaratmatakuliah.findAll({
                attributes: ['id'],
                include: [{model: matakuliah, as: 'mk', attributes: ['nama_mata_kuliah','kode_mata_kuliah'], where: {id:matkul_id}},{model: matakuliah, as: 'smk', attributes: ['nama_mata_kuliah','kode_mata_kuliah']}],
            }).then(function(data){
                res.json({status: true, message: "success", data: data});
            }).catch(function(err){
                res.json({status: false, message: "an error occured", err: err})
            })
        }
    }

    getMatkul(req,res){ //ambil matkul yang mau diprediksi
        matakuliah.findAll({
            where: {is_class: true}
        }).then(function(data){
            res.json({status: true, message: "success", data: data});
        }).catch(function(err){
            res.json({status: false, message: "an error occured", err: err})
        })
    }
}

module.exports = new MataKuliah;