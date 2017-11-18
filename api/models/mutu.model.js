var sequelize = require('./../dbsequelize');

module.exports = function(sequelize, DataType){
	return sequelize.define('mutu',{
        nama_mutu: DataType.STRING,
        batas_bawah: DataType.INTEGER,
		batas_atas: DataType.INTEGER,
    });
}