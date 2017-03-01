const express = require('express')

const users = express.Router()

users.get('/', (req,res) => {
	res.send(`user routes`)
})

module.exports = users