const express = require('express')
const passport = require('passport')

const api = require("../controllers/users.controller")

const users = express.Router()

users.route('/checkauth').get((req,res) => {
	req.user ? res.send(true) : res.send(false)
})

users.route('/signup')
	.post(api.create)

users.route('/signin')
	.post(passport.authenticate('local'), api.signIn)

users.route('/initialGroup')
	// .get(api.defaultGroup)
	.get((req,res) => {res.send('ok')})

users.param("userId", api.byId)

users.route("/:userId").get(api.getById)


module.exports = users