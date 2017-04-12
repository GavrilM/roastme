const passport = require('passport')
const User = require("mongoose").model("User")

module.exports.create = function(req,res){
	req.body.username = req.body.displayName.replace(/\s/g,'').toLowerCase()
	const user = new User(req.body)
	user.provider = 'local'
	user.save()
	.then(result => {
		req.login(user, (err) => {
			return err ? res.send(500, err) : res.send('Logged in')
		})
	})
	.catch(err => {
		if(err.message === 'Invalid Code') err = 'Invalid Code'
		res.status(400).send(err)
	})
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

