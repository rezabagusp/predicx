var express = require('express'),
    sequelize = require('../dbsequelize'),
    jwt = require('jsonwebtoken')

var Mahasiswa = sequelize.import(__dirname + '/../models/mahasiswa.model.js')
var Ekstrakurikuler = sequelize.import(__dirname + '/../models/ekstrakurikuler.model')
var Departement = sequelize.import(__dirname + '/../models/departemen.model')
var Skor = sequelize.import(__dirname + '/../models/skor.model')
	
Ekstrakurikuler.belongsTo(Mahasiswa, {foreignKey:'fk_mahasiswa_id'})
Ekstrakurikuler.belongsTo(Skor, {foreignKey:'fk_skor_id'})

class Summary {
	contructor() {
		this.request = ''
		this.accepted = ''
		this.rejected = ''
		this.pending = ''
	}
	
	GetMahasiswaSummary(data, res) {
		Mahasiswa
			.findOne({
				where: {
					id: data.params.id
				}, 
				attributes: ['id']
			})
			.then((idmahasiswa) => {
				if(jwt.decode(data.headers.token).id != JSON.parse(JSON.stringify(idmahasiswa)).id) {
					res.json({status: false, message: "Sorry you can only access your summary"})
				} else {
					Ekstrakurikuler
						.findAll({
							where: {
								fk_mahasiswa_id: data.params.id
							}
						})
						.then((ekstrakurikulers) => {
							this.CountSummary(JSON.parse(JSON.stringify(ekstrakurikulers)), res)
						})
						.catch((err) => {
							res.json({status: false, message: "Sorry we cant access your DB", err: err})
						})
				}
			})
			.catch((err) => {
				res.json({status:false, message:"Sorry we cant access your DB", err: err})
			})
	}
	
	GetDepartementSummary(data, res) {
		Departement
			.findOne({
				where: {
					id: data.params.id
				},
				attributes: ['id']
			})
			.then((iddepartement) => {
				if(jwt.decode(data.headers.token).fk_departemen_id != JSON.parse(JSON.stringify(iddepartement)).id) {
					res.json({status: false, message: "Sorry you can only access your summary"})
				} else {
					if(data.params.id == 9) {
						Ekstrakurikuler
							.findAll()
							.then((ekstrakurikulers) => {
								this.CountSummary(JSON.parse(JSON.stringify(ekstrakurikulers)), res)
							})
							.catch((err) => {
								res.json({status: false, message:"Sorry we cant access your DB", err:err})
							})
					} else {
						Ekstrakurikuler
							.findAll({
								include: [{
									model: Mahasiswa,
									where: {
										fk_departemen_id: data.params.id
									}
								}]
							})
							.then((ekstrakurikulers) => {
								this.CountSummary(JSON.parse(JSON.stringify(ekstrakurikulers)), res)
							})
							.catch((err) => {
								res.json({status: false, message:"Sorry we cant access your DB", err:err})
							})
					}
				}
			})
			.catch((err) => {
				res.json({status: false, message:"Sorry we cant access your DB", err:err})
			})
	}

	GetDepartementData(req, res) {
		if(req.params.id != req.headers.token.fk_departemen_id) {
			let lengthdept = 0
			let dept = []
			Departement
				.findAll()
				.then((result) => {
					lengthdept = result.length
					for(let i=0; i<lengthdept; i++) {
						let objek = {skor: [0], label: result[i].nama_departemen, id: result[i].id}
						dept.push(objek)
					}
					Ekstrakurikuler
						.findAll({
							include: [{
								model: Skor
							}, {
								model:Mahasiswa
							}]
						})
						.then((ekstrakurikulers) => {
							for(let i=0; i<ekstrakurikulers.length-1; i++) {
								if(ekstrakurikulers[i].status_verifikasi_ekstrakurikuler == 1) {
									console.log(dept[ekstrakurikulers[i].mahasiswa.fk_departemen_id - 1])
									dept[ekstrakurikulers[i].mahasiswa.fk_departemen_id - 1].skor[0] += ekstrakurikulers[i].skor.skor
								}
							}	
							console.log(dept)
							res.json({status:true, message:"Success get your Summary", result: dept})
						})
				})
		}
	}

	CountSummary(data, res) {
		this.request = 0
		this.accepted = 0
		this.rejected = 0
		this.pending = 0
		for(let i=0; i<data.length; i++) {
			if(data[i].status_submit == true) {
				this.request++
				if(data[i].status_verifikasi_ekstrakurikuler == 1) {
					this.accepted++
				} else if(data[i].status_verifikasi_ekstrakurikuler == 2) {
					this.rejected++
				} else {
					this.pending++
				}
			}
		}
		res.json({status:true, message:"Success to get your summary", result:{total:data.length, request:this.request, accepted:this.accepted, rejected:this.rejected, pending:this.pending}})
	}
}

module.exports = new Summary;