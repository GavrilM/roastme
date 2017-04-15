const passport = require('passport')
const mongoose = require("mongoose")
const User = mongoose.model("User")
const Group = mongoose.model("Group")

module.exports.create = function(req,res){
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
	})
	.catch(err => {
		console.log(err)
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

module.exports.updateAccount = function(_id, data){
	return User.update({_id : mongoose.Types.ObjectId(_id)}, data)
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
