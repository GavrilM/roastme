const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require("../models/user")

module.exports = function(){
	passport.use(new LocalStrategy(user, pass, done){
		User.findOne({
			email: user
		}, (err, user) => {
			if(err)
				return done(err)
			if(!user)
				return done(null, false, { message: "Not found"})
			if(!user.authWithPassword(pass))
				return done(null, false, { message: "Invalid password"})
			return done(null, user)
		})
	})
}