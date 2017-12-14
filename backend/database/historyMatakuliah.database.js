var sequelize = require('./../dbconnection');
var historyMataKuliah = sequelize.import(__dirname + '/../models/historyMataKuliah.model');
historyMataKuliah.sync().then(()=>{
	historyMataKuliah.bulkCreate([{
        fk_mahasiswa_id: 1, 
        fk_mata_kuliah_id : 4, //pengantar matematika
        fk_nilai_mutu_id: 4,
        status: null        
    },
    {
        fk_mahasiswa_id: 1, 
        fk_mata_kuliah_id : 5, //kalkulus
        fk_nilai_mutu_id: 4,
        status: null        
    }
    ]);
});