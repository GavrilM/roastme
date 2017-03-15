const express = require('express')

const api = require("../controllers/users.controller")

const users = express.Router()

users.route('/signup')
	.get((req,res) => {
		res.send(`user routes`)
	})
	.post(api.create)

users.route('/signin')
	.post(passport.authenticate('local'), api.signin)

users.param("userId", api.byId)

users.route("/:userId").get(api.getById)

module.exports = users