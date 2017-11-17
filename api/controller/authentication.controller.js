var express = require('express'),
	sequelize = require('../dbsequelize'),
    jwt = require('jsonwebtoken'),
    rp = require('request-promise');
    crypto = require('crypto');

// const oauth2 = require('simple-oauth2').create(credentials);    
var Client = require('node-rest-client').Client;
var client = new Client();

var user = sequelize.import('./../models/user.model.js');
var mahasiswa = sequelize.import('./../models/mahasiswa.model.js');

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
        user.findOne({
            where: {
                nama_user: this.nama_user,
                password_user: this.password_user
            }
        }).then((hasil)=>{
            var token = jwt.sign(hasil.dataValues, SECRET_KEY);
            res.json({status:true, message:"login berhasil", token:token});
        }).catch((err)=> {
            mahasiswa.findOne({
                where: {
                    nama_user:this.nama_user,
                    password_user:this.password_user
                }
            }).then((data)=>{
                var token = jwt.sign(data.dataValues, SECRET_KEY);
                res.json({status:true, message:"login berhasil", token:token});
            }).catch((err)=>{
                res.json({status:false, message:'login gagal'})
            })
        })
    }
    auth2(data, res){
        var code = data.query.code
        var options = {
            method: 'POST',
            url: 'http://accounts.ipb.ac.id/OAuth/token.php',
            form: {
                // Like <input type="text" name="name">
                client_id: 'fmipa.skpi',
                client_secret: '445634566',
                grant_type: 'authorization_code',
                code: code
            },
            json: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',  // Is set automatically,
                'Authorization': 'Bearer '+code,
            }
        };
        rp(options) // requst for access token
            .then(function(body) {
                console.log('tokennya', body.access_token)
                let options1 = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',  // Is set automatically,
                        'Authorization': 'Bearer '+ body.access_token,
                    },
                    json: true
                }
                rp.post('https://accounts.ipb.ac.id/OAuth/api.php/me/', options1) // request for claims
                .then(function(body){
                    mahasiswa
                        .findOne({
                            where: {
                                nama_user: body.username
                            }
                        })
                        .then((result) => {
                            var token = jwt.sign(result.dataValues, SECRET_KEY);
                            console.log(result.dataValues,'http://localhost:8000/#/auth/sso/'+token)
                            res.redirect('http://localhost:8000/#/auth/sso/'+token)
                        })
                        .catch((err) => {
                            // console.log(err)
                            mahasiswa
                                .create({
                                    nama_user: body.username,
                                    nama_mahasiswa: body.nama,
                                    nim_mahasiswa: body.nim,
                                    email_user: body.email,
                                    role: (body.status).toLowerCase(),
                                    fk_departemen_id: (body.nim).charAt(1)
                                })
                                .then((row) => {
                                    mahasiswa
                                        .findOne({
                                            where: {
                                                nama_user: body.username
                                            }
                                        })
                                        .then((data) => {
                                            var token = jwt.sign(data.dataValues, SECRET_KEY);
                                            res.redirect('http://localhost:8000/#/auth/sso/'+token)
                                        })
                                        .catch((err) => {
                                            res.json({status: false, message: 'failed to loggin', err: err})
                                        })
                                })
                        })
                }).catch(function(err){
                    res.json(err)
                })
            }).catch(function(err){
                res.json(err)
            })

    }
}

module.exports = new Authentication;