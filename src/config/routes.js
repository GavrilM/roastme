const express = require('express')

const base = express.Router()

base.get('/', (req,res) => {
	res.send(`This is ${__dirname}`)
})

base.get('*', (req,res) => {
	res.send('Sry my dood, dis a 404 error')
})

const api = express.Router()

api.get('/', (req,res) => {
	res.send(`API route`)
})

module.exports.main = base
module.exports.api = api