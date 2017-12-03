var sequelize = require('./../dbconnection');

/* check connection*/
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

var mahasiswa = sequelize.import(__dirname + '/../models/mahasiswa.model');
var departemen = sequelize.import(__dirname + '/../models/departemen.model');

var historyMataKuliah = sequelize.import(__dirname + '/../models/historyMataKuliah.model');
var mahasiswaModel = sequelize.import(__dirname + '/../models/mahasiswaModel.model');
var mataKuliah = sequelize.import(__dirname + '/../models/mataKuliah.model');
var nilaiMataKuliah = sequelize.import(__dirname + '/../models/nilaiMataKuliah.model');
var nilaiMutu = sequelize.import(__dirname + '/../models/nilaiMutu.model');
var syaratMataKuliah = sequelize.import(__dirname + '/../models/nilaiMutu.model');


// create table

departemen.sync().then(()=>{
    mahasiswa.sync().then(()=>{
      mahasiswaModel.sync().then(()=>{
        mataKuliah.sync().then(()=>{
          historyMataKuliah.sync().then(()=>{
            syaratMataKuliah.sync().then(()=>{
              nilaiMataKuliah.sync().then(()=>{
                nilaiMutu.sync();
              })
            })
          })
        })
      })
    })
})