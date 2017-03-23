const express = require('express')
const passport = require('passport')

const api = require("../controllers/users.controller")

const users = express.Router()

users.route('/signup')
	.post(api.create)

users.route('/signin')
	.post(passport.authenticate('local'), api.signIn)

users.param("userId", api.byId)

users.route("/:userId").get(api.getById)

module.exports = users