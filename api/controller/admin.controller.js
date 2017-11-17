var express = require('express'),
    crypto = require('crypto'),
    sequelize = require('../dbsequelize');

var skor = sequelize.import('../models/skor.model.js');
var kategori = sequelize.import('../models/kategori.model.js');
var sub_kategori = sequelize.import('../models/sub_kategori.model.js');
var user = sequelize.import('../models/user.model.js');
var tingkat = sequelize.import('../models/tingkat.model.js');
var departemen = sequelize.import('../models/departemen.model.js');
var mutu = sequelize.import('../models/mutu.model.js');
var mahasiswa = sequelize.import('../models/mahasiswa.model.js');



sub_kategori.belongsTo(kategori, {foreignKey:'fk_kategori_id'})
skor.belongsTo(tingkat, {foreignKey:'fk_tingkat_id'})
skor.belongsTo(sub_kategori, {foreignKey:'fk_sub_kategori_id'})
user.belongsTo(departemen, {foreignKey:'fk_departemen_id'})


class Admin{
    constructor(){}
    
    // get all table
    getAllKategori(data, res){
        kategori.findAll({

        }).then((hasil)=>{
            res.json({status: true, message:'berhasil get all kategori', result: hasil})
        }).catch(()=>{
            res.json({status: false, message:'error saat menenukan all kategori'})
        })
    }
    getAllSubKategori(data, res){
        sub_kategori.findAll({
            include:[{
                model: kategori
            }]
        }).then((hasil)=>{
            res.json({status: true, message: 'Berhasil get all sub kategori', result: hasil})
        }).catch((err)=>{
            res.json({status: false, message: 'error saat get all sub kategori'})
        })
    }
    getAllSkor(data, res){
        console.log('masuk all skor')
        skor.findAll({
            order:[['createdAt', 'DESC']],
            include:[{
                model:tingkat
            },{
                model:sub_kategori,
                include:[{
                    model:kategori
                }]
            }]
        }).then((hasil)=>{
            res.json({status:true, message:'berhasil get all skor', result:hasil})
        }).catch((err)=>{
            res.json({statuss:true, mesage:'error saat get all skor'})
        })
    }
    getAllUser(data, res){
        console.log('masuk')
        user.findAll({
            include:[{
                model: departemen
            }]
        }).then((hasil)=>{
            res.json({status:true, message:'berhasil get all user', result: hasil});
        }).catch((err)=>{
            res.json({status:false, message:'gagal get all user'});
        })
    }
    getAllDepartemen(data, res){
        departemen.findAll({

        }).then((hasil)=>{
            res.json({status: true, message:'berhasil get all departemen', result: hasil})
        }).catch((err)=>{
            res.json({status:false, message:'gagal get all departemen'})
        })
    }
    getAllMutu(data, res){
        mutu.findAll({

        }).then((hasil)=>{
            res.json({status: true, message:'berhasil get all mutu', result:hasil})
        }).catch((err)=>{
            res.json({status: false, message:'gagal get all muru'})
        })
    }
    getAllMahasiswa(data, res){
        mahasiswa.findAll({

        }).then((hasil)=>{
            res.json({status:true, message:'berhasil get all mahasiswa', result: hasil})
        }).catch((err)=>{
            res.json({status:false, message:'gagal get all mahasiswa'})
        })
    }
    
    // table kategori
    addKategori(data, res){
        var nama_kategori = data.body.nama_kategori;

        kategori.create({
            nama_kategori: nama_kategori
        }).then((hasil)=>{
            if(hasil)
                res.json({status:true, message:'berhasil menambah kategori'});
            else
                res.json({status:false, message:'gagal menambah kategori'})
        }).catch(()=>{
            res.json({status:false, message:'error saat membuat kategori baru'})
        });
    }
    updateKategori(data, res){
        console.log('bodynya: ', data.body)
        var id_kategori = data.body.id_kategori,
            nama_baru = data.body.nama_baru_kategori;

        kategori.findOne({
            where:{
                id: id_kategori
            }
        }).then((hasil)=>{
            if (hasil.length==0 || hasil==null)
                res.json({status: false, mesage:'kategori tidak ditemukan'})
            else{
                kategori.update({
                    nama_kategori: nama_baru
                },{
                    where:{
                        id: id_kategori
                    }
                }).then(()=>{
                    res.json({status:true, message:'berhasil mengupdate kategori'})
                }).catch(()=>{
                    res.json({status:false, message:'error saat melakukan update'})
                })
            }
        }).catch((err)=>{
            res.json({status:false, message:'error saat pencarian kategori'})
        })
    }
    deleteKategori(data, res){
        var id = data.body.id_kategori;

        kategori.findOne({
            where:{
                id: id
            }
        }).then((hasil)=>{
            if (hasil.length == 0 || hasil == null )
                res.json({status: false, message:'kategori tidak ditemukan'});
            else{
                kategori.destroy({
                    where:{
                        id: id
                    }
                }).then(()=>{
                    res.json({status:true, message:'berhasil menghapus kategori'});
                }).catch((err)=>{
                    console.log(err)
                    res.json({status:false, message:'Cannot delete or update a parent row: a foreign key constraint fails'})
                });                    
            }
        }).catch(()=>{
            res.json({status:false, message:'eror saat pencarian kategori'})
        })
    }

    // table sub_kategori
    addSubKategori(data, res){
        // menerima nama_sub_kategori, id_kategori
        var nama_sub_kategori = data.body.nama_sub_kategori,
            id_kategori = data.body.id_kategori;

        sub_kategori.create({   
            nama_sub_kategori: nama_sub_kategori,
            fk_kategori_id: id_kategori
        }).then(()=>{
            res.json({status:true, message:'berhasil menambah sub_kategori baru'})
        }).catch(()=>{
            res.json({status: false, message:'error saat membuat kategori baru'});
        })
    }
    updateSubKategori(data, res){
        // menerima id_sub kategori nama_sub_kategori, dan id_tingkat
        var id_sub_kategori = data.body.id_sub_kategori,
            nama_sub_kategori = data.body.nama_sub_kategori, //nama baru
            id_kategori = data.body.id_kategori;

        sub_kategori.findOne({
            where:{
                id: id_sub_kategori
            }
        }).then((hasil)=>{
            if(hasil.length == 0 || hasil==null)
                res.json({status: false, message:'subkategori tidak ditemukan'})
            else {
                sub_kategori.update({
                    nama_sub_kategori: nama_sub_kategori,
                    fk_kategori_id: id_kategori
                },{
                    where:{
                        id: id_sub_kategori
                    }
                }
                ).then(()=>{
                    res.json({status:true, message:'update sub kategori berhasil'})
                }).catch(()=>{
                    res.json({status: false, message:'error saat melakukan update sub kategori'})
                })
            }
        }).catch(()=>{
            res.json({status: false, message:'erros saat pencarian sub kategori'})
        })
    }
    deleteSubKategori(data, res){
        // menerima id sub kategori
        var id_sub_kategori = data.body.id_sub_kategori

        sub_kategori.findOne({
            where: {
                id: id_sub_kategori
            }
        }).then((hasil)=>{
            if(hasil.length == 0 || hasil == null)
                res.json('sub_kategori tidak ditemukan')
            else{
                sub_kategori.destroy({
                    where: {
                        id: id_sub_kategori
                    }
                }).then(()=>{
                    res.json({status:true, message:'berhasil menghapus sub kategeri'})
                }).catch(()=>{
                    res.json({status: false, message:'err saat melakukan penghapusan sub kategori'})
                })                
            }
        }).catch(()=>{
            res.json({status: false, message:'error saat pencarian sub kategori'})
        })
    }

    // table skor
    getSkor(data, res){
        //menerima id_tingkat dan id_sub_kategori
        var id_tingkat = data.body.id_tingkat,
            id_sub_kategori = data.body.id_sub_kategori;

        //check udah pernah ada kombinasi atau belum
        skor.findOne({
            where:{
                fk_sub_kategori_id: id_sub_kategori,
                fk_tingkat_id: id_tingkat
            }
        }).then((hasil)=>{
            if(hasil == null)
                res.json({status:true, message:'kombinasi skor belum pernah ada'})
            else
                res.json({status:false, message:' kombinasi skor sudah pernah ada'})
        }).catch((err)=>{
            res.json({status: false, message:'error saat melakukan pencarian kombinasi skor'})
        })
    }
    addSkor(data, res){
        // menerima fk_sub_kategori dan fk_tingkat, dan skor
        console.log(data.body)
        var id_tingkat = data.body.id_tingkat,
            id_sub_kategori = data.body.id_sub_kategori,
            skor_baru = data.body.skor;

        skor.findOne({
            where:{
                fk_tingkat_id: id_tingkat,
                fk_sub_kategori_id: id_sub_kategori
            }
        }).then((hasil)=>{
            if (hasil == null){
                skor.create({
                    skor: skor_baru,
                    fk_tingkat_id: id_tingkat,
                    fk_sub_kategori_id: id_sub_kategori
                }).then(()=>{
                    res.json({status:true, message:' berhasil manambahkan skor baru'})
                }).catch(()=>{
                    res.json({status: false, message: 'error saar menambahkan skor'})
                });
            }
            else
                res.json({status:false, message:'row skor sudah pernah ada'}); 
        }).catch((err)=>{
            res.json({status: flase, message: 'error saat pencarian skor'})
        })
    }
    updateSkor(data, res){
        // menerima id_sub_kategori, id_tingkat, dan skor
        var fk_sub_kategori_id = data.body.id_sub_kategori,
            fk_tingkat_id = data.body.id_tingkat,
            skor_baru = data.body.skor;
        skor.findOne({
            where:{
                fk_sub_kategori_id: fk_sub_kategori_id,
                fk_tingkat_id: fk_tingkat_id
            }
        }).then((hasil)=>{
            if (hasil.length==0 || hasil == null)
                res.json({status: false, message:'hasil tidak ditemukan'});
            else {
                skor.update({
                    skor: skor_baru
                },{
                    where:{
                        fk_sub_kategori_id: fk_sub_kategori_id,
                        fk_tingkat_id: fk_tingkat_id
                    }
                }).then(()=>{
                    res.json({status:true, message:'update skor berhasil'})
                }).catch(()=>{
                    res.json({status: false, message:'error saat update skor'})
                })
            }
        }).catch(()=>{
            res.json({status:false, message:'error saat pencarian'})
        })
        
    }
    deleteSkor(data,res){
        // menerima id skor
        var id_skor = data.body.id_skor;

        skor.findOne({
            where:{
                id: id_skor
            }
        }).then((hasil)=>{
            if(hasil == null)
                res.json({status:false, message:'row skor tidak ditemukan'})
            else{
                skor.destroy({
                    where:{
                        id: id_skor
                    }
                }).then(()=>{
                    res.json({status:true, message:'berhasil menghapus skor'})
                }).catch(()=>{
                    res.json({status: false, message:'error saat menghapus skor'})
                })                
            }
        }).catch((err)=>{
            res.json({status: false, message: 'error saat pencarian skor'});
        })
    }

    // table users
    addUser(data, res){
        // menerima nama_user, email_user, password_user, role, id_departemen, 
        console.log(data.body)
        var nama_user = data.body.nama_user,
            email_user = data.body.email_user,
            password_user = data.body.password_user,
            role = data.body.role,
            id_departemen = data.body.id_departemen;
        user.create({
            nama_user: nama_user,
            email_user: email_user,
            password_user: crypto.createHash('sha256').update(password_user).digest('hex'),
            role: role,
            fk_departemen_id: id_departemen
        }).then(()=>{
            res.json({status:true, message:'berhasil menambahkan user baru'})
        }).catch(()=>{
            res.json({status: false, message: 'error saat menambahkan user baru'})
        });
    }
    updateUser(data, res){
        console.log(data.body)
        // menerima nama user, email user, password user, role, id_departemen, id_user
        var nama_user = data.body.nama_user,
            email_user = data.body.email_user,
            password_user = data.body.password_user,
            role = data.body.role,
            id_departemen = data.body.id_departemen,
            id_user = data.body.id_user;
    
        user.findOne({
            where:{
                id: id_user
            }
        }).then((hasil)=>{
            if(hasil == null)
                res.json({status: false, message:'user tidak ditemukan'});
            else{
                user.update({
                    nama_user: nama_user,
                    email_user: email_user,
                    password_user: crypto.createHash('sha256').update(password_user).digest('hex'),
                    role: role,
                    fk_departemen_id: id_departemen
                },{
                    where:{
                        id: id_user
                    }
                }).then(()=>{
                    res.json({status:true, message:'berhasil mengupdate user'})
                }).catch(()=>{
                    res.json({status: false, message:'error saat melakukan update user'})
                })
            }
        }).catch(()=>{
            res.json({status: false, message:'error saat pencarian user'})
        })
    }
    deleteUser(data, res){
        // menerima id user
        var id_user = data.body.id_user;

        user.findOne({
            where:{
                id:id_user
            }
        }).then((hasil)=>{
            if(hasil == null)
                res.json({status: false, message: 'user tidak ditemukan'})
            else{
                user.destroy({
                    where:{
                        id:id_user
                    }
                }).then(()=>{
                    res.json({status:true, message:'berhasil menghapus user'});
                }).catch(()=>{
                    res.json({status:false, message:'error pada ssaat melakukan penghapusan'});
                })                
            }
        }).catch(()=>{
            res.json({status:false, message:'eror pada saat pencarian user'})
        })
    }

    // table mutu
    addMutu(data, res){
        //menerima nama_mutu, nilai batas_bawah, dan batas_atas
        var nama_mutu = data.body.nama_mutu,
            batas_bawah = data.body.batas_bawah,
            batas_atas = data.body.batas_atas
        if(!nama_mutu || !batas_bawah || !batas_atas)
            res.json({status:false, message: 'request tidak lengkap'})
        else 
            mutu.create({
                nama_mutu: nama_mutu,
                batas_atas: batas_atas,
                batas_bawah: batas_bawah
            }).then((hasil)=>{
                res.json({status: true, message:'berhasil menambahkan mutu baru'})
            }).catch((err)=>{
                res.json({status:false, message:'error saat menambahakan mutu'})
            })
    }
    updateMutu(data, res){
        //menerima nama_mutu, batas_bawah, batas_atas
        var nama_mutu = data.body.nama_mutu,
            batas_bawah = data.body.batas_bawah,
            batas_atas = data.body.batas_atas,
            id_mutu = data.body.id_mutu
        if(!nama_mutu || !batas_bawah || !batas_atas)
            res.json({status:false, message: 'request tidak lengkap'})
        else
            mutu.findOne({
                where:{
                    id:id_mutu
                }
            }).then((hasil)=>{
                if(hasil==null)
                    res.json({status:false, message:'mutu tidak ditemukan'})
                else
                    mutu.update({
                        nama_mutu: nama_mutu,
                        batas_atas: batas_atas,
                        batas_bawah :batas_bawah
                    }, {
                        where:{
                            id: id_mutu
                        }
                    }).then((hasil)=>{
                        res.json({status: true, message:'berhasil update mutu'})
                    }).catch((err)=>{
                        res.json({status:false, mesage:'error saat update mutu'})
                    })
            })
    }
    deleteMutu(data, res){
        // menerima id_mutu
        var id_mutu = data.body.id_mutu;
        if(!id_mutu)
            res.json({status: false, message:'request tidak lengkap'})
        else
            mutu.findOne({
                where:{
                    id: id_mutu
                }
            }).then((hasil)=>{
                if(hasil==null)
                    res.json({status:false, message:'mutu tidak ditemukan'})
                else 
                    mutu.destroy({
                        where:{
                            id: id_mutu
                        }
                    }).then((hasil)=>{
                        res.json({status: true, message: 'berhasil delete mutu'})
                    }).catch((err)=>{
                        res.json({status:false, message:'error saat delete mutu '})
                    })
            }).catch((err)=>{
                res.json({status:false, mesage:'error saat menghapus mutu'})
            })
    }

    // table departemen
    addDepartemen(data, res){
        // menerima nama_departemen
        var nama_departemen=data.body.nama_departemen
        if(!nama_departemen)
            res.json({status:false, message:'request tidak lengkap'})
        else
            departemen.create({
                nama_departemen: nama_departemen
            }).then((hasil)=>{
                res.json({status: true, message:'berhasil menambahkan departemen'})
            }).catch((err)=>{
                res.json({status: false, message:'error saat menambahkan departemen'})
            })
    }
    updateDepartemen(data, res){
        // menerima id_departemen, nama_departemen
        var id_departemen = data.body.id_departemen,
            nama_departemen = data.body.nama_departemen
        if(!id_departemen || !nama_departemen)
            res.json({status:false, message:'request tidak lengkap'})
        else 
            departemen.findOne({
                where:{
                    id: id_departemen
                }
            }).then((hasil)=>{
                if(hasil == null)
                    res.json({status:false, message:'departemen tidak ditemukan'})
                else 
                    departemen.update({
                        nama_departemen: nama_departemen
                    },{
                        where:{
                            id: id_departemen
                        }
                    }).then((hasil)=>{
                        res.json({status: true, message:'berhasil update departemen'})
                    }).catch((err)=>{
                        res.json({status: false, mesage:'error saat melakukan update'})
                    })
            }).catch((err)=>{
                res.json({status: false, message:'error saat pencarian departemen'})
            })
    }
    deleteDepartemen(data, res){
        // menerima id_departemen
        var id_departemen = data.body.id_departemen;


        if(!id_departemen)
            res.json({status:false, message:'request tidak lengkap'})
        else
            departemen.findOne({
                where:{
                    id: id_departemen
                }
            }).then((hasil)=>{
                if(hasil == null)
                    res.json({status:false, message:'departemen tidak ditemukan'})
                else 
                    departemen.destroy({
                        where:{
                            id: id_departemen
                        }
                    }).then((hasil)=>{
                        res.json({status: true, message:'berhasil mmenghapus departemen'})
                    }).catch((err)=>{
                        res.json({status: false, mesage:'gagal melakukan penghapusan departemen'})
                    })
            }).catch((err)=>{
                res.json({status: false, message:'error saat pencarian departemen'})
            })
    }

    // table mahasiswa
}

module.exports = new Admin;
