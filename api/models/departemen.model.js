var sequelize = require('./../dbsequelize');

module.exports = function(sequelize, DataType){
	return sequelize.define('departemen',{
        nama_departemen:DataType.STRING
    });
}