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

users.route('/claimInvite')
	.post(api.claimInvite)

users.route('/signout')
	.post(api.signOut)

users.route('/forgotten')
	.post(api.resetPassword)

users.route('/confirmReset')
	.post(api.confirmReset)

users.route('/newPassword')
	.post((req,res) => api.updateAccount(req.body.email, { password: req.body.password}).then(result => res.end()))

users.route("/current")
	.get(api.getById)

users.route("/validEmail")
	.post(api.checkEmail)

users.route("/validateCode")
	.post(api.checkCode)

users.route('/initialGroup')
	.get(api.defaultGroup)

users.param("userId", api.byId)

users.route("/:userId").get(api.getById)


module.exports = users