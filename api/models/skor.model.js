var sequelize = require('./../dbsequelize');
var sub_kategori = sequelize.import('sub_kategori.model.js');
var tingkat = sequelize.import('tingkat.model.js');
module.exports = function(sequelize, DataType){
	return sequelize.define('skor',{
        skor: DataType.INTEGER,
        fk_sub_kategori_id:{
			type: DataType.INTEGER,
			references: {
				model: sub_kategori,
				key: 'id'
			}
        },
        fk_tingkat_id:{
			type: DataType.INTEGER,
			references: {
				model: tingkat,
				key: 'id'
			}
		}        
    });
}