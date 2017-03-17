const passport = require('passport')
const User = require("mongoose").model("User")

module.exports.create = function(req,res,next){
	const user = new User(req.body)
	user.provider = 'local'

	user.save((err) => {
		if(err){
			console.log(err)
			res.status(400).send(err)
		} 
		else{
			res.json(user)
			req.login(user, (err) => {
				return err ? next(err) : res.send('Logged in')
			})
		}
	})
}

module.exports.signIn = function(req, res, next){
	req.user ? res.send("fantastic") : res.send("sucks man")
}

module.exports.getById = function(req, res){
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