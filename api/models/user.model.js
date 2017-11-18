var sequelize = require('./../dbsequelize');
var departemen = sequelize.import('departemen.model.js');

module.exports = function(sequelize, DataType){
	return sequelize.define('user',{
        nama_user: DataType.STRING,
        email_user: DataType.STRING,
        password_user: DataType.STRING,
        role: DataType.ENUM('admin','departemen','fakultas'),
        fk_departemen_id:{
			type: DataType.INTEGER,
			references: {
				model: departemen,
				key: 'id'
			}
		}
    });
}