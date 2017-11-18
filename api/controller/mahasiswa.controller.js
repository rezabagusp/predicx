var express = require('express'),
    sequelize = require('../dbsequelize'),
    multer = require('multer'),
    path = require('path'),
    storage = multer.diskStorage({
	    destination: function (req, file, callback) {
	        callback(null, 'dist/assets/public/images');
	    },
	    filename: function (req, file, callback) {

            console.log(file.fieldname)
	        let ext = path.extname(file.originalname);
	        callback(null, file.fieldname+'-'+Date.now()+ext);
        }
    }),
	upload = multer({
        limits: {fileSize: 512 * 1000 * 1}, // 512 Kb
		fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname);
			if(ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.PNG') {
				return callback(new Error('Hanya file gambar yang diizinkan', false));
			}
			callback(null, true);
        },
        storage : storage  
	}).any();

var tingkat = sequelize.import('../models/tingkat.model.js');
var sub_kategori = sequelize.import('../models/sub_kategori.model.js');
var kategori = sequelize.import('../models/kategori.model.js');
var mahasiswa = sequelize.import('../models/mahasiswa.model.js');
var skor = sequelize.import('../models/skor.model.js');
var ekskul = sequelize.import('../models/ekstrakurikuler.model.js');

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
ekskul.belongsTo(skor, {foreignKey:'fk_skor_id'})
skor.belongsTo(sub_kategori, {foreignKey:'fk_sub_kategori_id'})
skor.belongsTo(tingkat, {foreignKey:'fk_tingkat_id'})


class Mahasiswa {
    constructor(){}

    fileUpload(data,res){
        upload(data, res, function(err){
            if(err) {
                res.json({status:false, message:'Format harus gambar dengan max size 512 KB'})}
            else res.json({status:true, message:'Berhasil upload', nama: data.files[0].filename})
        });
    }
    addEkskul(data, res){
        var nama_ekstrakurikuler = data.body.nama_ekstrakurikuler,
            fk_sub_kategori_id = data.body.fk_sub_kategori_id,
            fk_tingkat_id = data.body.fk_tingkat_id,
            kota = toTitleCase(data.body.kota),
            negara = toTitleCase (data.body.negara),
            tanggal_mulai = data.body.tanggal_mulai,
            tanggal_selesai = data.body.tanggal_selesai,
            bukti = data.body.bukti,
            id_mahasiswa = data.body.id_mahasiswa,
            skor_id = '';
            if(!nama_ekstrakurikuler ||!fk_sub_kategori_id || !fk_tingkat_id || !kota || !negara || !tanggal_mulai || !tanggal_selesai || !bukti || !id_mahasiswa) 
                res.json({status: false, message: 'request tidak lengkap'})
            else {
                skor.findOne({
                    where: {
                        fk_tingkat_id: fk_tingkat_id,
                        fk_sub_kategori_id: fk_sub_kategori_id
                    }
                }).then((hasil)=>{
                    skor_id = hasil.id
                    ekskul.create({
                        nama_ekstrakurikuler:nama_ekstrakurikuler,
                        kota:kota,
                        negara:negara,
                        tanggal_mulai:tanggal_mulai,
                        tanggal_selesai:tanggal_selesai,
                        fk_mahasiswa_id: id_mahasiswa,
                        bukti_ekstrakurikuler: bukti,
                        fk_skor_id: skor_id
                    }).then(()=>{
                        res.json({status:true, message:'berhasil menambahkan ekskul'})
                    }).catch((err)=>{
                        res.json({status:false, message:'gagal menambahkan ekskul'})
                    })                
                }).catch((err)=>{
                    res.json({status:false, message:'error saat pencarian skor'})
                })
            }
    }
    updateEkskul(data, res){
        console.log('bodynya',data.body)
        var id = data.body.id,
            nama_ekstrakurikuler = data.body.nama_ekstrakurikuler,
            fk_sub_kategori_id = data.body.fk_sub_kategori_id,
            fk_tingkat_id = data.body.fk_tingkat_id,
            kota = toTitleCase(data.body.kota),
            negara = toTitleCase (data.body.negara),
            tanggal_mulai = data.body.tanggal_mulai,
            tanggal_selesai = data.body.tanggal_selesai,
            bukti = data.body.bukti,
            skor_id = '',
            id_mahasiswa = data.body.id_mahasiswa;

        if(!id || !nama_ekstrakurikuler ||!fk_sub_kategori_id || !fk_tingkat_id || !kota || !negara || !tanggal_mulai || !tanggal_selesai || !id_mahasiswa) 
            res.json({status: false, message: 'request tidak lengkap'})
        else {
            ekskul.findOne({
                where: {
                    id:id
                }
            }).then((hasil)=>{
                if(hasil==null){
                    res.json({status:false, message: 'ekskul tidak ditemukan'})}
                else{
                    skor.findOne({
                        where: {
                            fk_tingkat_id: fk_tingkat_id,
                            fk_sub_kategori_id: fk_sub_kategori_id
                        }
                    }).then((hasil)=>{
                        if(hasil == null)
                            res.json({status:false, message:'skor tidak ditemukan'})
                        else{
                            console.log('ketemu skor id yang mau diupdate', hasil)
                            skor_id = hasil.id;
                            console.log('nama ekskukl barunya' , nama_ekstrakurikuler)
                            ekskul.update({
                                nama_ekstrakurikuler:nama_ekstrakurikuler,
                                fk_sub_kategori_id:fk_sub_kategori_id,
                                fk_tingkat_id:fk_tingkat_id,
                                kota:kota,
                                negara:negara,
                                tanggal_mulai:tanggal_mulai,
                                tanggal_selesai:tanggal_selesai,
                                fk_skor_id: skor_id,
                                status_verifikasi_ekstrakurikuler: 0, //update status back to 0
                                status_submit: false,
                                bukti_ekstrakurikuler: bukti         
                            },
                            {
                                where:{
                                    id:id,
                                    fk_mahasiswa_id:id_mahasiswa
                                }
                            }).then((hasil)=>{
                                console.log('haislnya', hasil)
                                res.json({status:true, message:'update berhasil'})
                            }).catch(()=>{
                                res.json({status: false, message:'error saat update'})
                            })                        
                        }
                    }).catch((err)=>{
                        res.json({status:false, message:'gagal saat pencarian nilai skor'})
                    })

                }
            }).catch((err)=>{
                res.json({status:false, message:'gagal saat pencarian ekskul'})
            })
        }
    }
    deleteEkskul(data,res){
        var id = data.body.id;
        var id_mahasiswa = data.body.id_mahasiswa;

        ekskul.findOne({
            where:{
                id: id
            }
        }).then((hasil)=>{
            if (hasil==null)
                res.json({status:false, message:'ekskul tidak ditemukan'})
            else {
                ekskul.destroy({
                    where:{
                        id:id,
                        fk_mahasiswa_id:id_mahasiswa
                    }
                }).then((hasil)=>{
                    res.json({status:true, message:'mengahapus ekskul berhasil'})
                }).catch(()=>{
                    res.json({status:false, message:'error saat menghapus'})
                })
            }
        }).catch(()=>{
            res.json({status:false, message:'error saat menemukan'})
        })

    }
    getAllEkskul(data, res){
        // menerima id mahasiswa
        var id_mahasiswa = data.params.id_mahasiswa;
        ekskul.findAll({
            order: [['createdAt', 'DESC']],
            include:[{
                model: skor,
                include:[{  
                    model: tingkat
                },{
                    model:sub_kategori,
                    include: kategori
                }]
            }],
            where: {
                fk_mahasiswa_id:id_mahasiswa,
            }

        }).then((hasil)=>{
            if(hasil.length==0 || hasil==null)
                res.json({status:true, message:'mahasiswa tidak memilki prestasi', result: hasil})
            else{
                
                res.json({status:true, message: 'berhasil get all ekskul', result: hasil});
            }
        }).catch(()=>{
            res.json({status: false, message:'error saat pencarian'})
        })
    }
    getSubKategori(data, res){
        sub_kategori.findAll({
            include:[{
                model: kategori
            }]
        }).then((hasil)=>{
            res.json({status:true, message:'berhasil get Sub kategori', result:hasil});
        }).catch((err)=>{
            res.json({status:false, message:'gagal get Sub kategori'})
        })
    
    }
    getKategori(data, res){
        kategori.findAll({
        }).then((hasil)=>{
            res.json({status:true, message:'berhasil get Kategori', result:hasil})

        }).catch((err)=>{
            res.json({status:false, message:'gagal get kategori'})
        })
    }
    getTingkat(data, res){
        tingkat.findAll({
        }).then((hasil)=>{
            res.json({status:true, message:'berhasil get tingkat', result:hasil})
        }).catch((err)=>{
            res.json({status:false, message:'gagal get tingkat'});
        })
    }
    getEkskulByID(data, res){
        // menerima id ekskul
        var id_ekskul = data.body.id_ekskul;

        ekskul.findOne({
            include:[{
                model: skor,
                include:[{
                    model:sub_kategori
                },{
                    model:tingkat
                }]
            }],
            where:{
                id: id_ekskul
            },
        }).then((hasil)=>{
            res.json(hasil);
        }).catch((err)=>{
            res.json(err);
        })
    }
    submitEkskul(data, res){
        // menerima id_ekskul, status_submit
        var id_ekskul = data.body.id_ekskul,
            status_submit = data.body.status_submit;
        if(!id_ekskul || !status_submit){
            res.json({status: false, message:'request tidak lengkap'})
        }
        else 
            ekskul.findOne({
                where:{
                    id: id_ekskul
                }
            }).then((hasil)=>{
                if(hasil==null)
                    res.json({status: false, message:'ekstrakurikuler tidak ditemukan'})
                else 
                    ekskul.update({
                        status_submit: status_submit,
                        keterangan:''
                    },{
                        where:{
                            id: id_ekskul
                        }
                    }).then((hasil)=>{
                        res.json({status: true, message: 'berhasil submit'})
                    }).catch((err)=>{
                        res.json({status: false, message:'gagal submit'})
                    })
            })
    }
    updateProfil(data, res){
        console.log(data.body.id_mahasiswa)
        var email = data.body.email,
            id_mahasiswa = data.body.id_mahasiswa;

        if(!email){
            res.json({status:false, message:'request tidak lengkap'})
        }
        else{
            if(re.test(email)){ // validate email with regex
                mahasiswa.findOne({
                    where: {
                        id: id_mahasiswa
                    }
                }).then((hasil)=>{
                    console.log(hasil.dataValues)
                    if(hasil == null){
                        res.json({status:false, message:'mahasiswa tidak ditemukan'})
                    }
                    else{
                        mahasiswa.update({
                            email_user: email
                        },{
                            where:{
                                id: id_mahasiswa
                            }
                        }).then((hasil)=>{
                            res.json({status: true, message:'Berhasil update profil'})
                        }).catch((err)=>{
                            res.json({status: false, message:'Gagal update profil'})
                        })
                    }
                }).catch((err)=>{
                    res.json({status:false, message:'error saar pencarian mahasiswa'})
                })                
            }
            else{
                res.json({status:false, message:'Email tidak valid'})
            }
        }
    }
}

module.exports = new Mahasiswa;