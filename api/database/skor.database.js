var sequelize = require('./../dbsequelize');
var skor = sequelize.import(__dirname + '/../models/skor.model');
skor.sync().then(()=>{
	skor.bulkCreate([{
        fk_sub_kategori_id: 1,
        fk_tingkat_id: 1,
        skor: 5
    },
    {
        fk_sub_kategori_id: 2,
        fk_tingkat_id: 1,
        skor: 4
    },    
    {
        fk_sub_kategori_id: 3,
        fk_tingkat_id: 1,
        skor: 4
    },    
    {
        fk_sub_kategori_id: 4,
        fk_tingkat_id: 1,
        skor: 3
    },    
    {
        fk_sub_kategori_id: 5,
        fk_tingkat_id: 1,
        skor: 3
    },    
    {
        fk_sub_kategori_id: 6,
        fk_tingkat_id: 1,
        skor: 2
    },
    //tingkat lokal & sub kategori 1-6
    {
        fk_sub_kategori_id: 1,
        fk_tingkat_id: 2,
        skor: 4
    },
    {
        fk_sub_kategori_id: 2,
        fk_tingkat_id: 2,
        skor: 3
    },    
    {
        fk_sub_kategori_id: 3,
        fk_tingkat_id: 2,
        skor: 3
    },    
    {
        fk_sub_kategori_id: 4,
        fk_tingkat_id: 2,
        skor: 2
    },    
    {
        fk_sub_kategori_id: 5,
        fk_tingkat_id: 2,
        skor: 2
    },    
    {
        fk_sub_kategori_id: 6,
        fk_tingkat_id: 2,
        skor: 2
    },        
    //tingkat lokal & sub kategori 1-6
    {
        fk_sub_kategori_id: 1,
        fk_tingkat_id: 3,
        skor: 2
    },
    {
        fk_sub_kategori_id: 2,
        fk_tingkat_id: 3,
        skor: 2
    },    
    {
        fk_sub_kategori_id: 3,
        fk_tingkat_id: 3,
        skor: 1
    },    
    {
        fk_sub_kategori_id: 4,
        fk_tingkat_id: 3,
        skor: 1
    },    
    {
        fk_sub_kategori_id: 5,
        fk_tingkat_id: 3,
        skor: 1
    },    
    {
        fk_sub_kategori_id: 6,
        fk_tingkat_id: 3,
        skor: 1
    },        
    //tingkat internasional & sub kategori 7-10
    {
        fk_sub_kategori_id: 7,
        fk_tingkat_id: 1,
        skor: 6
    },
    {
        fk_sub_kategori_id: 8,
        fk_tingkat_id: 1,
        skor: 5
    },    
    {
        fk_sub_kategori_id: 9,
        fk_tingkat_id: 1,
        skor: 4
    },    
    {
        fk_sub_kategori_id: 10,
        fk_tingkat_id: 1,
        skor: 3
    },         
    //tingkat nasional & sub kategori 7-10
    {
        fk_sub_kategori_id: 7,
        fk_tingkat_id: 2,
        skor: 5
    },
    {
        fk_sub_kategori_id: 8,
        fk_tingkat_id: 2,
        skor: 4
    },    
    {
        fk_sub_kategori_id: 9,
        fk_tingkat_id: 2,
        skor: 3
    },    
    {
        fk_sub_kategori_id: 10,
        fk_tingkat_id: 2,
        skor: 2
    },      
    //tingkat lokal & sub 7-10
    {
        fk_sub_kategori_id: 7,
        fk_tingkat_id: 3,
        skor: 4
    },
    {
        fk_sub_kategori_id: 8,
        fk_tingkat_id: 3,
        skor: 3
    },    
    {
        fk_sub_kategori_id: 9,
        fk_tingkat_id: 3,
        skor: 2
    },    
    {
        fk_sub_kategori_id: 10,
        fk_tingkat_id: 3,
        skor: 1
    },                  
	]);
});