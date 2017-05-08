const passport = require('passport')
const mongoose = require("mongoose")
const User = mongoose.model("User")
const Group = mongoose.model("Group")
const Invitees = mongoose.model("Invitee")
const mailer = require('../lib/mail')
const util = require('../lib/util')

function create(req,res,next,fromInvite){
	req.body.username = removeSpaces(req.body.displayName).toLowerCase()
	const user = new User(req.body)
	user.provider = 'local'
	user.save()
	.then(result => {
		return Group.update({
			addCode: req.body.initial
		}, {
			$addToSet: {
				users: {
					_id: result._id
				}
			}
		})
	})
	.then(result => {
		req.login(user, (err) => {
			return err ? res.send(500, err) : res.send('Logged in')
		})
		if(fromInvite){
			Invitees.remove({email:req.body.email})
		}
	})
	.catch(err => {
		console.log(err)
		if(err.message === 'Invalid Code') err = 'Invalid Code'
		res.status(400).send(err)
	})
}

module.exports.create = create

module.exports.claimInvite = function(req,res){
	Invitees.findOne({confirmCode: req.body.confirmCode})
	.then(invite => {
		invite = invite._doc
		req.body = Object.assign(req.body, invite)
		req.body.displayName = req.body.name + ''
		req.body.name = undefined
		create(req,res,null,true)
	})
	.catch(err => console.log(err))
}

module.exports.signIn = function(req, res, next){
	if(req.user){
		res.send("Already logged in!")
	}	
}

module.exports.signOut = function(req, res, next){
	req.logout()
	req.session.destroy()
	res.end()
}

module.exports.resetPassword = function(req, res){
	let user
	User.findOne({ email: req.body.email })
	.then(result => {
		if(!result)
			return new Error("User not found")
		else {
			user = result
			user.resetToken = util.makeid(6)
			return User.update({email: user.email}, {
				resetToken: user.resetToken,
				resetExpires: Date.now() + 3600000
			})
		}
	})
	.then(result => {
		mailer.resetPassword(user)
		res.send("Email Sent")
	})
	.catch(err => {
		console.log(err)
		res.status(500).send(err.message)
	})
}

module.exports.confirmReset = function(req, res){
	User.findOne({ 
		email: req.body.email,
		resetToken: req.body.code
	})
	.then(user => {
		if(!user)
			res.status(500).send("Invalid Code")
		else
			res.send("OK")
	})
}

module.exports.getById = function(req, res){
	delete req.user.password
	res.send(req.user)
}

module.exports.isUnique = function(req,res){
	User.findOne({ 
		username:req.body.username
	}, (err, user) => {
		if(user)
			res.send(false)
		else
			res.send(true)
	})
}

module.exports.invite = function(invitation, user){
	const invite = new Invitees(invitation)
	return invite.save()
	.then(res => {
		mailer.invite(user,res)
	})
}

module.exports.checkEmail = function(req,res){
	User.findOne({ 
		email:req.body.email
	}, (err, user) => {
		if(user)
			res.status(500).send('That email is in use.')
		else
			res.send(true)
	})
}

module.exports.checkCode = function(req,res){
	Invitees.findOne(req.body)
	.then(user => {
		user ? res.send(true) : res.send(false)
	})
	.catch(err => console.log(err))
}


module.exports.byId = function(req,res,next,id){
	User.findOne({
		_id:id
	}, (err,user) => {
		if(err)
			return next(err)
		req.user = user
		next()
	})
}

module.exports.defaultGroup = function(req,res){
	User.findOne({
		_id: req.user._id
	})
	.then(user => {
		res.send(user.groups[0])
	})
	.catch(err => {
		res.status(500).send('No groups found!')
	})
}

module.exports.updateAccount = function(email, data){
	return User.update({email}, data)
}

module.exports.search = function(query){
	return User.find({
		$text: {
			$search: query
		}
	})
}

function removeSpaces(text){
	return text.replace(/\s/g,'')
}
