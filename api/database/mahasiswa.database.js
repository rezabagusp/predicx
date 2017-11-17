var sequelize = require('./../dbsequelize');
var mahasiswa = sequelize.import(__dirname + '/../models/mahasiswa.model');
mahasiswa.sync().then(()=>{
	mahasiswa.bulkCreate([{
        nama_mahasiswa:'Reza Bagus Permana',
        nim_mahasiswa:'G64140023',
        nama_user:'reza_bagusp',
        password_user:'student',
        email_user:'rezabaguspermana.rbp@gmail.com',
        role:'mahasiswa',
        fk_departemen_id: 6
    }
    ]);
});