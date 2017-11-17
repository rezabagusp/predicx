var sequelize = require('./../dbsequelize');
var sub_kategori = sequelize.import(__dirname + '/../models/sub_kategori.model');
sub_kategori.sync().then(()=>{
	sub_kategori.bulkCreate([{
        nama_sub_kategori:'Kompetisi ilmiah/kewirausahaan/kebudayaan/seni/olah raga',
        fk_kategori_id: 1
    },
    {
        nama_sub_kategori:'Magang/kerja praktek/mengajar/asistensi di luar kegiatan kurikuler',
        fk_kategori_id: 1
    },
    {
        nama_sub_kategori:'Presentasi dalam seminar/lokakarya/konferensi ',
        fk_kategori_id: 1
    },
    {
        nama_sub_kategori:'Tampil dalam kebudayaan/seni/olah raga',
        fk_kategori_id: 1
    },    
    {
        nama_sub_kategori:'Ketua panitia dalam kegiatan kemahasiswaan',
        fk_kategori_id: 1
    },    
    {
        nama_sub_kategori:'Anggota panitia/peserta seminar/lokakarya/konferensi',
        fk_kategori_id: 1
    },    
    {
        nama_sub_kategori:'Sebagai ketua',
        fk_kategori_id: 2
    },
    {
        nama_sub_kategori:'Sebagai wakil ketua',
        fk_kategori_id: 2
    },    
    {
        nama_sub_kategori:'Sebagai ketua seksi',
        fk_kategori_id: 2
    },    
    {
        nama_sub_kategori:'Sebagai anggota',
        fk_kategori_id: 2
	},    
	]);
});