var express = require('express'),
    sequelize = require('../dbsequelize'),
    nodemailer = require(__dirname + '/mailer.controller.js'),
    ekskul = sequelize.import('../models/ekstrakurikuler.model.js');

var tingkat = sequelize.import('../models/tingkat.model.js');
var sub_kategori = sequelize.import('../models/sub_kategori.model.js');
var mahasiswa = sequelize.import('../models/mahasiswa.model.js');
var departemen = sequelize.import('../models/departemen.model.js');
var skor = sequelize.import('../models/skor.model.js');
var mutu = sequelize.import('../models/mutu.model.js');
var kategori = sequelize.import('../models/kategori.model.js');


mahasiswa.belongsTo(departemen, {foreignKey:'fk_departemen_id'})
ekskul.belongsTo(mahasiswa, {foreignKey:'fk_mahasiswa_id'})

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

class Departemen{
    
    constructor(){
    }
    
    getAllpresma(data, res){
        //menerima params id_departemen
        var id_departemen = data.params.id_departemen;
        if (id_departemen != 9){ //departemen
            ekskul.findAll({
                order: [['status_verifikasi_ekstrakurikuler', 'DESC']],
                include:[{
                    model: skor,
                    include:[{
                        model: tingkat
                    }, {
                        model: sub_kategori,
                        include:[{
                            model: kategori
                        }]
                    }]
                },{
                    model: mahasiswa,
                    include:[{
                        model:departemen
                    }],
                    where:{
                        fk_departemen_id:id_departemen
                    },                
                }],
                where:{
                    status_verifikasi_ekstrakurikuler:0,
                    status_submit:true
                }
            }).then((hasil)=>{
                res.json({status:true, message:'berhasil mendapatkan presma', result:hasil})
            }).catch(()=>{
                res.json({status:false, message:'gagal mendapatkan prestasi mahasiswa'});
            })
        }
        else if(id_departemen == 9){ //fakultas
            ekskul.findAll({
                order: [['createdAt', 'DESC']],
                include:[{
                    model: skor,
                    include: [{
                        model: tingkat
                    },{
                        model: sub_kategori,
                        include:[{
                            model: kategori
                        }]
                    }]
                },{
                    model: mahasiswa,
                    include:[{
                        model:departemen
                    }]
                }],
                where:{
                    status_verifikasi_ekstrakurikuler:0,
                    status_submit:true
                }                
            }).then((hasil)=>{
                res.json({status:true, message:'berhasil mengambil data presma', result:hasil})
            }).catch((err)=>{
                res.json({status:false, message:'error saat menemukan'})
            })            
        }
        
    }
    // method for update status of ekskul. jangan lupa diganti status[0,1,2]
    verifikasiEkskul(data, res){
        console.log('data bodynya:', data.body)
        //menerima status verif, id_ekskl dan keterangan
        var id = data.body.id_ekskul,
            status = data.body.status_verifikasi,
            keterangan = data.body.keterangan;

        if(!id || !status){
            res.json({status:false, message:'request tidak lengkap'})
        }
        else{
            ekskul.findOne({
                where: {
                    id:id
                }
            }).then((hasil)=>{
                if (hasil.length==0 || hasil==null)
                    res.json({status:false, message:'prestasi tidak ditemukan'})
                else{
                    ekskul.update({
                        status_verifikasi_ekstrakurikuler:status,
                        keterangan: keterangan
                    },
                    {
                        where:{
                            id:id
                        }
                    }).then((hasil)=>{
                        if (status == 2) {
                            nodemailer.SendTolak(id, keterangan, res)
                        } else {
                            res.json({status:true, message:'berhasil update status verifikasi'})
                        }
                    }).catch(()=>{
                        res.json({status:false, message:'error saat update'})
                    })      
                }
            }).catch((err)=>{
                res.json({status:false, message:'error saat pencarian ekskul'})
            })            
        }
    }
    getPresmaById(data, res){
        // menerima paramsnya id ekskul
        console.log(data.params)
        var id_ekskul = data.params.id_ekskul;
        ekskul.findOne({
            where:{
                id: id_ekskul
            }
        }).then((hasil)=>{
            if(hasil == null)
                res.json({status:false, message:'ekskul tidak ditemukan'})
            else{
                ekskul.findOne({
                    where:{
                        id: id_ekskul
                    },
                    include:[{
                        model:skor,
                        include:[{
                            model: tingkat,
                        },{
                            model: sub_kategori
                        }]                      
                    },{
                        model:mahasiswa,
                        include:[{
                            model:departemen
                        }]
                    }]
                }).then((hasil)=>{
                    res.json({status:true, message:'ekskul berhasil ditemukan', result:hasil});
                }).catch((err)=>{
                    res.json({status:false, message:'error saat menemukan'})
                })
 
            }
        }).catch((err)=>{
            res.json({status: false, message:'error saat pencarian ekskul'})
        })
    }
    getSummary(data, res){
        // menerima id departemen
        var id_departemen = data.params.id_departemen;
        if(id_departemen != 9){
            ekskul.aggregate('status_verifikasi_ekstrakurikuler', 'COUNT', {plain:false, group:['status_verifikasi_ekstrakurikuler']})
            .then((hasil)=>{
                res.json(hasil)
            })
        }
    }

    // departemen ke 9
    getAllMahasiswa(data, res){
        mahasiswa.findAll({
            include: [{
                model:departemen
            }],
        }).then((hasil)=>{
            res.json({status:true, message:'berhasil get all mahasiswa', result: hasil});
        }).catch((err)=>{
            res.json({status:false, message:'gagal get mahasiswa', result: err});
        })
    }
    getMahasiswa(data, res){
        // menerima params nim
        var nim = data.params.nim;
        if(!nim || nim==null)
            res.json({status:false, message:'data tidak lengkap'})
        else{
            mahasiswa.findOne({
                where: {
                    nim_mahasiswa: nim
                }
            }).then((hasil)=>{
                if(hasil == null)
                    res.json({status: false, message:'mahasiswa tidak ditemukan', resutl:hasil})
                else res.json({status: true, message:'mahasiswa ditemukan', result:hasil})
            }).catch((err)=>{
                res.json({status: false, message:'erro saat pencarian mahasiswa', result:err})
            })            
        }
    }
    getMutu(data, res){// kategori cukup, baik, sangat baik]
        // menerima jumlah skor
        var jumlah_skor = data.params.jumlah_skor;

        mutu.findOne({
            where: {
                batas_bawah: {
                    $lte: jumlah_skor
                },
                batas_atas: {
                    $gte: jumlah_skor
                }
            }
        }).then((hasil)=>{
            if(hasil == null)// tidak ada yang masuk rang antara 5 - 200, 
                res.json({status:true, message: 'berhasil get mutu, jumlah skor tidak memenuhi', result: null})
            else
                res.json({status: true, message: 'berhasil get mutu', result: hasil.nama_mutu})
        }).catch((err)=>{
            res.json({status: false, message:'error saat pencarian mutu', result: err})
        })
    }
    getAllDepartemen(data, res){
        departemen.findAll({
        }).then((hasil)=>{
            res.json({status: true, message: 'berhasil get all departemen', result: hasil})
        }).catch((err)=>{
            res.json({status: false, message:'gagal get all departemen'})
        })
    }
    getAllDetailIPEMahasiswa(data, res){
        // menerima nim mahasiswa, dan id_mahasiswa untuk get ekskul mahasiswswa yang belum di verif
        var nim_mahasiswa = data.params.nim;

        if(!nim_mahasiswa)
            res.json({status: false, message:'request tidak lengkap'})
        else {
            mahasiswa.findOne({
                where:{
                    nim_mahasiswa: nim_mahasiswa
                }
            }).then((hasil)=>{
                var id_mahasiswa = hasil.dataValues.id
                ekskul.findAll({
                    where:{
                        fk_mahasiswa_id: id_mahasiswa,
                        status_verifikasi_ekstrakurikuler:1
                    },
                    include:[{
                        model: mahasiswa
                    },{
                        model:skor,
                        include:[{
                            model: sub_kategori
                        },{
                            model: tingkat
                        }]
                    }]
                }).then((hasil)=>{
                    if(hasil.length == 0)
                        res.json({status: false, message:'mahasiswa tidak memiliki prestasi', result: hasil})
                    else
                        res.json({status: true, message:'Berhasil get all ipe mahasiswa', result: hasil})
                }).catch((err)=>{
                    res.json({status:false, message:'gagal saat menemukan ekstrakurikuler'})
                })
            }).catch((err)=>{
                res.json({status: false, message:'gagal menemukan mahasiswa'})
            })            
        }
    }
    postPencarian(data, res){
        // menerima string search_by nama_mahasiswa/ NIM/ departemen
        var search_by = data.body.search_by,
            search_data = data.body.search_data;
        
        if(search_by.toLowerCase() == 'nim'){
            mahasiswa.findAll({
                    where: {
                        nim_mahasiswa: search_data
                    },
                    include:[{
                        model: departemen
                    }]
            }).then((hasil)=>{
                if(hasil.length == 0)
                    res.json({status: false, message:'Pencarian tidak ditemukan'})
                else 
                    res.json({status: true, message:'Pencarian ditemukan', result: hasil})
            }).catch((err)=>{
                res.json({status: false, message:'Pencarian gagal ditemukan', err: err})
            })
        }
        else if (search_by.toLowerCase() == 'departemen') {
            mahasiswa.findAll({
                where:{
                    fk_departemen_id: search_data
                },
                include:[{
                    model:departemen
                }]
                                
            }).then((hasil)=>{
                if(hasil.length == 0)
                    res.json({status: false, message:'Pencarian tidak ditemukan'})
                else 
                    res.json({status:true, message:'Pencarian ditemukan', result: hasil})
            }).catch((err)=>{
                res.json({status: false, messge:'Pencarian gagal ditemukan'})
            })
        }
        else if (search_by.toLowerCase() == 'nama mahasiswa'){
            mahasiswa.findAll({
                where: {
                    nama_mahasiswa: {
                        $or:[{
                            $like: search_data+'%'
                        },{
                            $like: '%'+search_data
                        },{
                            $like: '%'+search_data+'%'
                        }]
                    }
                }, include:[{
                    model: departemen
                }]        
            }).then((hasil)=>{
                if(hasil.length == 0)
                    res.json({status: false, message:'Pencarian tidak ditemukan'})
                else
                    res.json({status:true, message:'Pencarian ditemukan', result: hasil})
            }).catch((err)=>{
                res.json({status:false, message: 'Pencarian gagal ditemukan'})
            })
        }
     }
}

module.exports = new Departemen;
