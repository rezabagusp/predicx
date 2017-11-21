var CronJob = require('cron').CronJob;
var mysqlDump = require('mysqldump');

/* job for bakcup db table mahasiswa and ekstrakurikuler*/
var job = new CronJob({
  cronTime: '00 00 18 * * 0-6',
  onTick: () => {
    mysqlDump({
        host: 'localhost',
        port:3306,
        user: 'root',
        password: '',
        tables:['mahasiswas', 'ekstrakurikulers'],
        ifNotExist:true,
        database: 'skpi',
        dest:'./backup/skpi'+ new Date().getDate() + new Date().getMonth() + new Date().getFullYear() +'.sql' // destination file 
    },function(err){
        console.log(new Date().getDate() + new Date().getMonth() + new Date().getFullYear()) 
    })
    console.log('run backup table mahasiswa and ekstrakurikuler') 
  },
  start: true,
  timeZone: 'Asia/Jakarta'
})

// job for backup all table
var job2 = new CronJob({
  cronTime: '00 30 18 * * 0',
  onTick: () => {
    mysqlDump({
        host: 'localhost',
        port:3306,
        user: 'root',
        password: '',
        ifNotExist:true,
        database: 'skpi',
        dest:'./backup/skpi_alltable'+ new Date().getDate() + new Date().getMonth() + new Date().getFullYear() +'.sql' // destination file 
    },function(err){
        console.log(new Date().getDate() + new Date().getMonth() + new Date().getFullYear()) 
    })
    console.log('run backup all table') 
  },
  start: true,
  timeZone: 'Asia/Jakarta'
})

// start the job
job.start()
job2.start()

console.log('job 1 status ', job.running)
console.log('job 2 status ', job2.running)