var sequelize = require('./../dbsequelize');
module.exports = function(sequelize, DataType){
	return sequelize.define('tingkat',{
        nama_tingkat: DataType.STRING
    });
}