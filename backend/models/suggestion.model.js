var sequelize = require('./../dbconnection');
var mataKuliah = sequelize.import('mataKuliah.model');
var mahasiswa = sequelize.import('mahasiswa.model');
var nilaiMutu = sequelize.import('nilaiMutu.model');

module.exports = function(sequelize, DataType){
	return sequelize.define('suggestion',{
        fk_mahasiswa_id:{
            type: DataType.INTEGER,
            references: {
              model: mahasiswa,
              key: 'id'
            }
        },
        fk_mata_kuliah_id:{
            type: DataType.INTEGER,
            references: {
              model: mataKuliah,
              key: 'id'
            }
        },
        fk_nilai_mutu_id:{
            type: DataType.INTEGER,
            references: {
              model: nilaiMutu,
              key: 'id'
            }
        },
        confidence: DataType.STRING,
        status: DataType.STRING
    });
}