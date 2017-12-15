var sequelize = require('./../dbconnection');
var syaratMataKuliah = sequelize.import(__dirname + '/../models/syaratMataKuliah.model');
syaratMataKuliah.sync().then(()=>{
	syaratMataKuliah.bulkCreate([{
        fk_mata_kuliah_id: 1, //aljabar linear
        syarat_mata_kuliah_id : 4
    },
    {
        fk_mata_kuliah_id: 1,
        syarat_mata_kuliah_id : 5
    },
    {
        fk_mata_kuliah_id: 2, //Pemrograman Linear
        syarat_mata_kuliah_id : 1 
    },    
    {
        fk_mata_kuliah_id: 2,
        syarat_mata_kuliah_id : 4
    },
    {
        fk_mata_kuliah_id: 2,
        syarat_mata_kuliah_id : 5
    },
    {
        fk_mata_kuliah_id: 2,
        syarat_mata_kuliah_id : 6
    },    
    {
        fk_mata_kuliah_id: 2,
        syarat_mata_kuliah_id : 7
    },    
    {
        fk_mata_kuliah_id: 3,
        syarat_mata_kuliah_id : 4
    },
    {
        fk_mata_kuliah_id: 3,
        syarat_mata_kuliah_id : 6
    },
    {
        fk_mata_kuliah_id: 3,
        syarat_mata_kuliah_id : 8
    },
    {
        fk_mata_kuliah_id: 12,
        syarat_mata_kuliah_id : 4
    },        
    {
        fk_mata_kuliah_id: 12,
        syarat_mata_kuliah_id : 5
    },        
    {
        fk_mata_kuliah_id: 12,
        syarat_mata_kuliah_id : 9
    },        
    {
        fk_mata_kuliah_id: 12,
        syarat_mata_kuliah_id : 10
    },        
    {
        fk_mata_kuliah_id: 13,
        syarat_mata_kuliah_id : 2
    },            
    {
        fk_mata_kuliah_id: 13,
        syarat_mata_kuliah_id : 3
    },
    {
        fk_mata_kuliah_id: 13,
        syarat_mata_kuliah_id : 4
    },
    {
        fk_mata_kuliah_id: 13,
        syarat_mata_kuliah_id : 5
    },
    {
        fk_mata_kuliah_id: 13,
        syarat_mata_kuliah_id : 6
    },
    {
        fk_mata_kuliah_id: 13,
        syarat_mata_kuliah_id : 11
    },                
    ]);
});