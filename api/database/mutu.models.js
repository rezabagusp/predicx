var sequelize = require('./../dbsequelize');
var mutu = sequelize.import(__dirname + '/../models/mutu.model');
mutu.sync().then(()=>{
	mutu.bulkCreate([{
        nama_mutu:'Sangat Baik',
        batas_bawah:40,
        batas_atas:200
    },
    {
        nama_mutu:'Baik',
        batas_bawah:20,
        batas_atas:39
    },
    {
        nama_mutu:'Cukup',
        batas_bawah:10,
        batas_atas:19
    },
    {
        nama_mutu:'Kurang',
        batas_bawah:5,
        batas_atas:9
	},    
	]);

});