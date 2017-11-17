var nodemailer = require('nodemailer');
var express = require('express'),
    sequelize = require('../dbsequelize');
var mahasiswa = sequelize.import('../models/mahasiswa.model.js');
var ekskul = sequelize.import('../models/ekstrakurikuler.model.js');
ekskul.belongsTo(mahasiswa, {foreignKey:'fk_mahasiswa_id'})

/*Settup email*/
var transport = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'miqdadfawwaz95@gmail.com',
		pass: 'bismill4h'
	}
})

/*Object for sending email*/
class Mailer {
	constructor() {
		/*SET OBJECT'S ATTRIBUTE IN HERE*/
		this.sender = '"SIM-SKPI FMIPA IPB" <miqdadfawwaz95@gmail.com>'
		this.receiver = ''
		this.subject = ''
        this.template = ''
	}
	/*Set template email for finished surat*/
	SetTemplateVerifikasiGagal (hasil, keterangan) {
		this.receiver = hasil.dataValues.mahasiswa.dataValues.email_user;
		this.subject = 'Pengajuan Prestasi Ditolak | SIM-SKPI FMIPA'
		this.template = `
			<p>Kami memberitahukan bahwa hasil verifikasi salah satu prestasi ekstrakurikuler yang anda ajukan <b>ditolak</b>. Silahkan login ke SIM-SKPI dan lakukan revisi pada prestasi tersebut.</p>
			<br>
			<p>Nama Kegiatan: ` + hasil.dataValues.nama_ekstrakurikuler + `</p>
			<p>Keterangan: ` + keterangan + `</p>
			<p>Terima kasih.</p>
			<p>SIM SKPI IPB.</p>
		`
	}

	SendTolak(id, keterangan, res) {
		ekskul.findOne({
			where: {
				id: id
			},
			include: [{
				model: mahasiswa
			}]
		})
		.then((hasil) => {
			this.SetTemplateVerifikasiGagal(hasil, keterangan);
			this.Send(res);
		})
		.catch((err) => {
			res.json({status: false, message: 'Gagal!', err: err})
		})
	}

	/*send email*/
	Send(res) {
		var mailOptions = {
			from: this.sender,
			to: this.receiver, 
			subject: this.subject,  
			html: this.template
		}
		transport.sendMail(mailOptions, (error, info) => {
			if (error) {
				res.json({status: false, message: 'Mail sent failed', err: error})
			} else {
				res.json({status: true, message: 'Ekstrakurikuler berhasil ditolak! Email berhasil dikirimkan!', hasil: info})
			}
		})
	}
}

module.exports = new Mailer;