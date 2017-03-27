const express = require('express')
const passport = require('passport')

const api = require('../controllers/groups.controller')

const groups = express.Router()

// groups.use(passport.authenticate('local'))

groups.route('/new')
	.get((req,res) => {
		res.send("cool")
	})
	.post(api.new)

module.exports = groups