var express = require('express'),
	sequelize = require('../dbconnection'),
    jwt = require('jsonwebtoken'),
    fetch = require('node-fetch'),    
    crypto = require('crypto');

var mahasiswa = sequelize.import('./../models/mahasiswa.model.js');

// akases LDAP IPB
function ldap_auth(username, password){
    let url = "http://ng.rajamuda.web.id/ldap_auth.php?username="+username+"&password="+password;

    return fetch(url)
        .then(mhs => {
            return mhs.text();
        })
}

class Authentication{

    constructor(){  
        this.nama_user='';
        this.password_user='';
    }

    setNamaUser(data){
        this.nama_user = data;
    }
    setPasswordUser(data){
        this.password_user = crypto.createHash('sha256').update(data).digest('hex');
    }
    login(data, res){
        this.setNamaUser(data.nama_user);
        this.setPasswordUser(data.password_user);
        mahasiswa.findOne({
            where: {
                nama_user:this.nama_user,
                password_user:this.password_user
            }
        }).then((data)=>{
            var token = jwt.sign(data.dataValues, SECRET_KEY);
            res.json({status:true, message:"login berhasil", token:token});
        }).catch((err)=>{
            res.json({status:false, message:"gagal login"})
        })

    }

    login_ldap(data, res){
        var username = data.body.username;
        var password = data.body.password;
        ldap_auth(username, password)
            .then(data => {
                console.log('masuk then')
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
                    
                    res.json({status: true, message: 'login success yang baru', mhs_info: mhs_info});
                }
            });        

    }
}

module.exports = new Authentication;