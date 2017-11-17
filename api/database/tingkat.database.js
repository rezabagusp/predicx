var sequelize = require('./../dbsequelize');
var tingkat = sequelize.import(__dirname + '/../models/tingkat.model');
tingkat.sync().then(()=>{
	tingkat.bulkCreate([{
        nama_tingkat:'Internasional',
    },
    {
        nama_tingkat:'Nasional',
    },    
    {
        nama_tingkat:'Lokal',
    },        
	]);
});