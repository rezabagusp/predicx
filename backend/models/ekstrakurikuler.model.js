var sequelize = require('./../dbsequelize');
var skor = sequelize.import('skor.model.js');

var mahasiswa = sequelize.import('mahasiswa.model.js');

module.exports = function(sequelize, DataType){
	return sequelize.define('ekstrakurikuler',{
        nama_ekstrakurikuler: DataType.STRING,
        tanggal_mulai: DataType.DATE,
		tanggal_selesai: DataType.DATE,
		kota:DataType.STRING,
		negara:DataType.STRING,
		bukti_ekstrakurikuler: DataType.STRING,
		keterangan:DataType.STRING,
		status_submit: {
			type: DataType.BOOLEAN, 
			defaultValue: false
		},
		status_verifikasi_ekstrakurikuler: {
			type: DataType.INTEGER, 
			defaultValue: 0
		},
        fk_mahasiswa_id:{
			type: DataType.INTEGER,
			references: {
				model: mahasiswa,
				key: 'id'
			}
		},
		fk_skor_id:{
			type: DataType.INTEGER,
			references: {
				model: skor,
				key: 'id'
			}
		}		
    });
}