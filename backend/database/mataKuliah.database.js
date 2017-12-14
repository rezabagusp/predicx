var sequelize = require('./../dbconnection');
var mataKuliah = sequelize.import(__dirname + '/../models/mataKuliah.model');
mataKuliah.sync().then(()=>{
	mataKuliah.bulkCreate([{
        kode_mata_kuliah:'mat219',
        nama_mata_kuliah:'Aljabar Linear',
        semester:3,
        is_class:1
    },
    {
        kode_mata_kuliah:'mat232',
        nama_mata_kuliah:'Pemrograman Linear',
        semester:4,
        is_class:1
    },
    {
        kode_mata_kuliah:'mat234',
        nama_mata_kuliah:'Graf Algoritmik',
        semester:4,
        is_class:1
    },
    {
        kode_mata_kuliah:'mat100',
        nama_mata_kuliah:'Pengantar Matematika',
        semester:1,
        is_class:0
    },
    {
        kode_mata_kuliah:'mat103',
        nama_mata_kuliah:'Kalkulus',
        semester:2,
        is_class:0
    },    
    {
        kode_mata_kuliah:'kom101',
        nama_mata_kuliah:'Algoritme',
        semester:2,
        is_class:0
    },        
    {
        kode_mata_kuliah:'stk201',
        nama_mata_kuliah:'Metode Statistika ',
        semester:3,
        is_class:0
    },  
    {
        kode_mata_kuliah:'kom209',
        nama_mata_kuliah:'Struktur Diskret',
        semester:3,
        is_class:0
    },            
    {
        kode_mata_kuliah:'kom220',
        nama_mata_kuliah:'TOK/Pengantar Matematika Komputasi',
        semester:4,
        is_class:0
    },            
    {
        kode_mata_kuliah:'kom325',
        nama_mata_kuliah:'Komputasi Numerik',
        semester:5,
        is_class:0
    },            
    {
        kode_mata_kuliah:'kom200',
        nama_mata_kuliah:'Dasar Pemrograman',
        semester:3,
        is_class:0
    },            
    {
        kode_mata_kuliah:'kom331',
        nama_mata_kuliah:'Pemrograman Tak Linear',
        semester:5,
        is_class:1
    },            
    {
        kode_mata_kuliah:'mat431',
        nama_mata_kuliah:'Pemodelan Riset Operasi',
        semester:7,
        is_class:1
    },
    {
        kode_mata_kuliah:'stk211',
        nama_mata_kuliah:'Metode Penarikan Contoh',
        semester:3,
        is_class:1
    },
    {
        kode_mata_kuliah:'stk222',
        nama_mata_kuliah:'Perancangan Percobaan',
        semester:4,
        is_class:1
    },
    {
        kode_mata_kuliah:'stk331',
        nama_mata_kuliah:'Analisis Regresi',
        semester:5,
        is_class:1
    },
    {
        kode_mata_kuliah:'stk351',
        nama_mata_kuliah:'Pengantar Analisis Kategorik',
        semester:6,
        is_class:1
    },
    {
        kode_mata_kuliah:'stk351',
        nama_mata_kuliah:'Metode Peramalan Deret',
        semester:5,
        is_class:1
    }
    
	]);

});