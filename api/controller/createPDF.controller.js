var fs = require('fs')
var pdf = require('html-pdf')
var moment = require('moment')
var sequelize = require(__dirname + '/../dbsequelize')
var tingkat = sequelize.import(__dirname + '/../models/tingkat.model')
var kategori = sequelize.import(__dirname + '/../models/kategori.model')
var sub_kategori = sequelize.import(__dirname + '/../models/sub_kategori.model')
var bobot = sequelize.import(__dirname + '/../models/skor.model')
var mahasiswa = sequelize.import(__dirname + '/../models/mahasiswa.model')
var ekstrakurikuler = sequelize.import(__dirname + '/../models/ekstrakurikuler.model')
var departemen = sequelize.import(__dirname + '/../models/departemen.model')

mahasiswa.belongsTo(departemen, {foreignKey:'fk_departemen_id'})

class GeneratePDF {
	constructor() {
		this.resource = ''
		this.destination = ''
		this.options = ''
		this.tanggalttd = ''
		this.namadekan = ''
		this.nipdekan = ''
		this.idmahasiswa = ''
		this.nama = ''
		this.NIM = ''
		this.prodi = ''
		this.tanggallulus = ''
		this.tingkats = ''
		this.kategoris = ''
		this.sub_kategoris = ''
		this.bobots = ''
		this.ekstrakurikulers = ''
		this.total = 0
		this.bukti = 0
		this.kesimpulan = ''
		this.banyaksubperkategori = []
		this.indexekstrakurikuler = 0
		this.indikator = 0
	}
	InitGeneratePDF(data, res) {
		// this.Redefine()
		this.resource = fs.readFileSync(__dirname + '/dynamictamplate.html', 'utf8');
		this.options = { 
			"format": 'A4', 
			"base": 'file:///' + __dirname + '//',
			"border": {
			    "top": "10mm",            // default is 0, units: mm, cm, in, px 
			    "right": "10mm",
			    "bottom": "10mm",
			    "left": "10mm"
			  },
		}
	}
	/*Set date of printed the pepper*/
	SetTanggalTTD(data, res) {
		this.tanggalttd = moment().locale('id').format('D MMMM YYYY')
		this.resource = this.resource.replace('{{tanggalttd}}', this.tanggalttd)
		this.resource = this.resource.replace('{{tanggalttd}}', this.tanggalttd)
	}
	/*Set Dekan Identitas*/
	SetDekanFMIPA(data, res/*Need params for dynamic dekan*/) {
		/*Need accessing database for dynamic dekan indetitas*/
		this.namadekan = 'Dr. Ir. Sri Nurdiati, M.Sc'
		this.nipdekan = '19601126 198601 2 001'
		this.resource = this.resource.replace('{{namadekan}}', this.namadekan)
		this.resource = this.resource.replace('{{nipdekan}}', this.nipdekan)
		this.resource = this.resource.replace('{{namadekan}}', this.namadekan)
		this.resource = this.resource.replace('{{nipdekan}}', this.nipdekan)
	}
	/*Set identitas of mahasiswa*/
	SetIdentitasMahasiswa(data, res/*need params*/) {
		console.log(data.body)
		var nim = data.body.nim,
			tanggal_lulus = moment(data.body.tanggal_lulus).locale('id').format('DD MMMM YYYY');
		mahasiswa
			.findOne({
				where: {
					/*sementara*/
					nim_mahasiswa: nim
				},
				include:[{
					model: departemen
				}]
			})
			.then((mahasiswas) => {
				this.idmahasiswa = mahasiswas.id
				this.nama = mahasiswas.nama_mahasiswa
				this.NIM = mahasiswas.nim_mahasiswa
				this.prodi = mahasiswas.departemen.nama_departemen
				this.tanggallulus = tanggal_lulus
				this.resource = this.resource.replace('{{Nama}}', this.nama)
				this.resource = this.resource.replace('{{Nama}}', this.nama)
				this.resource = this.resource.replace('{{Nama}}', this.nama)
				this.resource = this.resource.replace('{{NIM}}', this.NIM)
				this.resource = this.resource.replace('{{NIM}}', this.NIM)
				this.resource = this.resource.replace('{{NIM}}', this.NIM)
				this.resource = this.resource.replace('{{Prodi}}', this.prodi)
				this.resource = this.resource.replace('{{Prodi}}', this.prodi)
				this.resource = this.resource.replace('{{Prodi}}', this.prodi)
				this.resource = this.resource.replace('{{Prodi}}', this.prodi)				
				this.resource = this.resource.replace('{{Tanggal}}', this.tanggallulus)
				this.resource = this.resource.replace('{{Tanggal}}', this.tanggallulus)
				this.GetDataSKPI(data, res)
			})
	}
	/*Get all needed data from database*/
	GetDataSKPI(data, res/*need params*/) {
		/*Get tingkat data (International, National, Local)*/
		tingkat
			.findAll()
			.then((tingkats) => {
				this.tingkats = JSON.parse(JSON.stringify(tingkats))
				/*Get kategori data (Kegiatan or himpro)*/
			})
		kategori
			.findAll()
			.then((kategoris) => {
				this.kategoris = JSON.parse(JSON.stringify(kategoris))
				/*Get Sub_kategori data (the role of kategori data)*/
			})
		sub_kategori
			.findAll({
				order: [
					['fk_kategori_id'],
					['id']
				]
			})
			.then((sub_kategoris) => {
				this.sub_kategoris = JSON.parse(JSON.stringify(sub_kategoris))
				/*Get skor of the role witch specific kategori and sub_kategori*/
			})
		bobot
			.findAll({
				order: [
					['fk_sub_kategori_id'],
					['fk_tingkat_id']
				]
			})
			.then((bobots) => {
				this.bobots = JSON.parse(JSON.stringify(bobots))
				/*Get mahasiswa ekstrakulikuler of specific mahasiswa*/
			})
		ekstrakurikuler
			.findAll({
				where: {
					/*sementara*/
					fk_mahasiswa_id: this.idmahasiswa,
					status_verifikasi_ekstrakurikuler: 1
				},
				order: [
					['fk_skor_id'],
					['id']
				]
			})
			.then((ekstrakurikulers) => {
				this.ekstrakurikulers = JSON.parse(JSON.stringify(ekstrakurikulers))
				this.SetSubPerKategori(data, res)
				this.SetPDFSKPI(data, res)
			})
	}
	/*Count sub-kategori/primary-katagori (ex: Kegiatan have 6 sub_kategori)*/
	SetSubPerKategori(data, res) {
		this.banyaksubperkategori = []
		for(let i=0; i<this.kategoris.length; i++) {
			let count = 0
			for(let j=0; j<this.sub_kategoris.length; j++) {
				if(this.sub_kategoris[j].fk_kategori_id == this.kategoris[i].id) {
					count++
				}
			}
			this.banyaksubperkategori.push(count)
		}
	}
	/*Set Page 1 of SKPI*/
	/*Set tamplate of page 1*/
	SetPDFSKPI(data, res) {
		/*Variable for number of kategori*/
		let indexkategori = 0
		let indexawalsubkategori = 0
		this.indexekstrakurikuler = 0
		this.total = 0
		for(let i=0; i<this.kategoris.length; i++) {
			/*loop tingkat*/
			for(let j=0; j<this.tingkats.length; j++) {
				/*Write to tamplate HTML with let katgori*/
				this.bukti = 0
				let kategoris = `
					<tr>
						<td align="center" rowspan="{{rowspankategori}}">`+ (indexkategori + 1) +`</td>
					</tr>
					<tr>
						<th align="left" colspan="4">Mengikuti `+ this.kategoris[i].nama_kategori +` di Tingkat `+ this.tingkats[j].nama_tingkat +`</th>
					</tr>
					{{sub_kategoris}}
				`
				/*function for replace {{kategoris}} with let kategoris*/
				this.resource = this.resource.replace('{{kategoris}}', kategoris)
				let kategorisbukti = `
					<tr>
						<td align="center" rowspan="{{rowspanbukti}}">`+ (indexkategori+1) +`</td>
					</tr>
					<tr>
						<th align="left" colspan="5">Mengikuti `+ this.kategoris[i].nama_kategori +` di Tingkat `+ this.tingkats[j].nama_tingkat +`</th>
					</tr>
					{{daftar}}
				`
				this.resource = this.resource.replace('{{bukti}}', kategorisbukti)
				let indexsubkategori = 1
				this.indikator = 0
				/*Write tamplate sub_kategori for each kategori*/
				for(let k=0; k<this.banyaksubperkategori[i]; k++) {
					if(this.sub_kategoris[k+indexawalsubkategori].fk_kategori_id == this.kategoris[i].id) {
						if(this.bobots[this.tingkats.length * (this.sub_kategoris[k+indexawalsubkategori].id-1) + j] != undefined ) {
							let skor = this.bobots[this.tingkats.length * (this.sub_kategoris[k+indexawalsubkategori].id-1) + j]
							var sub_kategoris = `
								<tr>
									<td class="isikegiatan">
										`+ (indexsubkategori) +`.	`+this.sub_kategoris[k+indexawalsubkategori].nama_sub_kategori+`
									</td>
									<td class="angka">
										`+ skor.skor +`
									</td>
									<td class="angka">
										{{jumlah}}
									</td>
									<td class="angka">
										{{skor}}
									</td>
								</tr>
								{{sub_kategoris}}						
								`
							this.resource = this.resource.replace('{{sub_kategoris}}', sub_kategoris)
							this.LoopData(skor, indexkategori)
							indexsubkategori++
						}
					}
				}
				this.resource = this.resource.replace('{{rowspankategori}}', indexsubkategori + 1)
				this.resource = this.resource.replace('{{rowspanbukti}}', this.bukti + 2)
				this.resource = this.resource.replace('{{sub_kategoris}}', '{{kategoris}}')
				this.resource = this.resource.replace('{{daftar}}', '{{bukti}}')
				indexkategori++
			}
			indexawalsubkategori += this.banyaksubperkategori[i]
		}
		this.resource = this.resource.replace('{{kategoris}}', '')
		this.SetSummary(data, res)
	}
	/*Put the skor of SKPI in page 1*/
	LoopData(skor, indexkategori) {
		let count = 0
		if(this.ekstrakurikulers.length != this.indexekstrakurikuler) {
			while(this.ekstrakurikulers[this.indexekstrakurikuler].fk_skor_id == skor.id) {
				/*Set waktu in SKPI*/
				if(this.ekstrakurikulers[this.indexekstrakurikuler].tanggal_mulai == this.ekstrakurikulers[this.indexekstrakurikuler].tanggal_selesai) {
					var tanggal = moment(this.ekstrakurikulers[this.indexekstrakurikuler].tanggal_mulai).locale('id').format('D MMMM YYYY')
				} else if(moment(this.ekstrakurikulers[this.indexekstrakurikuler].tanggal_mulai).format('MMM') != moment(this.ekstrakurikulers[this.indexekstrakurikuler].tanggal_selesai).format('MMM')) {
					if(moment(this.ekstrakurikulers[this.indexekstrakurikuler].tanggal_mulai).format('YY') != moment(this.ekstrakurikulers[this.indexekstrakurikuler].tanggal_selesai).format('YY')) {
						var tanggal = moment(this.ekstrakurikulers[this.indexekstrakurikuler].tanggal_mulai).locale('id').format('D MMMM YYYY') + ' - ' +  moment(this.ekstrakurikulers[this.indexekstrakurikuler].tanggal_selesai).locale('id').format('D MMMM YYYY')
					} else {
						var tanggal = moment(this.ekstrakurikulers[this.indexekstrakurikuler].tanggal_mulai).locale('id').format('D MMMM') + ' - ' +  moment(this.ekstrakurikulers[this.indexekstrakurikuler].tanggal_selesai).locale('id').format('D MMMM YYYY')		
					}
				} else {
					var tanggal = moment(this.ekstrakurikulers[this.indexekstrakurikuler].tanggal_mulai).locale('id').format('D') + ' - ' +  moment(this.ekstrakurikulers[this.indexekstrakurikuler].tanggal_selesai).locale('id').format('D MMMM YYYY')
				}
				var bukti = `
					<tr>
						<td align="center">`+ (this.indikator+1) +`</td>
						<td style="vertical-align: top; text-align: left">`+ this.ekstrakurikulers[this.indexekstrakurikuler].nama_ekstrakurikuler +`</td>
						<td align="center">`+ tanggal +`</td>
						<td align="center">`+ skor.skor +`</td>
						<td align="center"> ada </td>
					</tr>
					{{daftar}}
					`
					console.log(this.ekstrakurikulers[this.indexekstrakurikuler].bukti_ekstrakurikuler)
				var foto_bukti = `
					<img src= "G64140023-1507055889216.jpg" height="800" width=700>
					{{foto_bukti}}
				`
				this.resource = this.resource.replace('{{foto_bukti}}', foto_bukti)
				this.resource = this.resource.replace('{{daftar}}', bukti)
				count++
				this.indikator++
				this.indexekstrakurikuler++
				if(this.ekstrakurikulers.length == this.indexekstrakurikuler) {
					break
				}
			}
		}
		if(count == 0){
			this.resource = this.resource.replace('{{jumlah}}', '')
		} else {
			this.resource = this.resource.replace('{{jumlah}}', count)
		}
		this.resource = this.resource.replace('{{skor}}', count*skor.skor)
		this.total += count*skor.skor
		this.bukti += count
	}
	/*Set simpulan and total skor of SKPI*/
	SetSummary(data, res) {
		this.resource = this.resource.replace('{{totalskor}}', this.total)
		this.resource = this.resource.replace('{{totalskor}}', this.total)
		if(this.total > 40) {
			this.kesimpulan = 'Sangat Baik'
		} else if(this.total > 20) {
			this.kesimpulan = 'Baik'
		} else if(this.total > 10) {
			this.kesimpulan = 'Cukup'
		} else if(this.total > 5) {
			this.kesimpulan = 'Kurang'
		} else {
			this.kesimpulan = ''
		}
		this.resource = this.resource.replace('{{kesimpulan}}', this.kesimpulan)
		this.resource = this.resource.replace('{{kesimpulan}}', this.kesimpulan)
		this.ConvertHTLM2PDF(data, res)
	}
	/*Convert HTML to PDF*/
	ConvertHTLM2PDF(data, res) {
		this.destination = __dirname + '/../public/ipe/'+this.NIM+'.pdf'
		this.resource = this.resource.replace('{{bukti}}', '')
		this.resource = this.resource.replace('{{foto_bukti}}', '')
		pdf
			.create(this.resource, this.options)
			.toFile(this.destination, (err, pdf) => {
				if (err) {
					res.json({status: false, message:'gagal convert pdf', result: 'pdf.pdf'})
				} else {
					res.json({status: true, message:'berhasil convert pdf', result: 'pdf.pdf'})
				}
			})
	}
	CreateGeneratePDF(data, res) {
		this.InitGeneratePDF(data, res)
		this.SetTanggalTTD(data, res)
		this.SetDekanFMIPA(data, res)
		this.SetIdentitasMahasiswa(data, res)
	}
}

module.exports = new GeneratePDF;
/*
	1.	You can change the name of variable and function if you want rebuild this controller
	2.	You can search the faster module for generate PDF then html-pdf
	3.	You can refactory this function, because imn't sure with this controller will work with dynamic data and will work with big data
	4.	You can refactory tamplate of this html in dynamictamplate.html in this folder
NOTE: Overall imnot sure with this controller can hendle dynamic PDF for SKPI data, you can refactor or write new controller for the fastest result
*/