var sequelize = require('./../dbsequelize');
var kategori = sequelize.import(__dirname + '/../models/kategori.model');
kategori.sync().then(()=>{
	kategori.bulkCreate([{
		nama_kategori:'Kegiatan kemahasiswaan'
    },
    {
		nama_kategori:'Himpunan/Organisasi Profesi Kemahasiswaan'
		}
    ]);
});