var sequelize = require('./../dbconnection');
var mahasiswa = sequelize.import(__dirname + '/../models/mahasiswa.model');
mahasiswa.sync().then(()=>{
	mahasiswa.bulkCreate([{
        nama_mahasiswa:'Reza Bagus Permana',
        nim_mahasiswa:'G64140023',
        nama_user:'reza_bagusp',
        password_user:'264c8c381bf16c982a4e59b0dd4c6f7808c51a05f64c35db42cc78a2a72875bb',
        email_user:'rezabaguspermana.rbp@gmail.com',
        role:'mahasiswa',
        fk_departemen_id: 6
    }
    ]);
});