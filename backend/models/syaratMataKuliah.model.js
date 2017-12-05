var sequelize = require('./../dbconnection');
var mataKuliah = sequelize.import('mataKuliah.model');

module.exports = function(sequelize, DataType){
	return sequelize.define('syaratMataKuilah',{
        fk_mata_kuliah_id:{
          type: DataType.INTEGER,
          references: {
            model: mataKuliah,
            key: 'id'
          }
        },
        syarat_mata_kuliah_id: {
          type: DataType.INTEGER,
          references: {
            model: mataKuliah,
            key: 'id'
          }
        }
    });
}