var sequelize = require('./../dbconnection');
var mataKuliah = sequelize.import('mataKuliah.model');
var mahasiswa = sequelize.import('mahasiswa.model');


module.exports = function(sequelize, DataType){
	return sequelize.define('historyMataKuliah',{
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
		}
    });
}