var express = require('express')
var router = express.Router()
var Summary = require(__dirname + '/../controller/summary.controller')

router.get('/mahasiswasummary/:id', (req, res, next) => {
	Summary.GetMahasiswaSummary(req, res)
}) 

router.get('/departementsummary/:id', (req, res, next) => {
	Summary.GetDepartementSummary(req, res)
})

router.get('/departementdata/:id', (req, res, next) => {
	Summary.GetDepartementData(req, res)
})

module.exports = router;