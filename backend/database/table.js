var sequelize = require('./../dbsequelize');

/* check connection*/
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

var ekstrakurikuler = sequelize.import(__dirname + '/../models/ekstrakurikuler.model.js');
var kategori = sequelize.import(__dirname + '/../models/kategori.model.js');
var mahasiswa = sequelize.import(__dirname + '/../models/mahasiswa.model.js');
var sub_kategori = sequelize.import(__dirname + '/../models/sub_kategori.model.js');
var tingkat = sequelize.import(__dirname + '/../models/tingkat.model.js');
var user = sequelize.import(__dirname + '/../models/user.model.js');
var departemen = sequelize.import(__dirname + '/../models/departemen.model.js');
var skor = sequelize.import(__dirname + '/../models/skor.model.js');
var mutu = sequelize.import(__dirname + '/../models/mutu.model.js');


// create table

kategori.sync().then(() => {
    sub_kategori.sync().then(() => {
      tingkat.sync().then(()=> {
        skor.sync().then(() => {            
            departemen.sync().then(()=> {
              mahasiswa.sync().then(()=> {
                user.sync().then(()=>{
                  ekstrakurikuler.sync();
                  mutu.sync();
                })
              });
            });
          });
        });
    });
});