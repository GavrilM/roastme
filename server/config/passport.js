const passport = require('passport'),
	mongoose = require('mongoose')

const userStrat = require("./strategies/users")

module.exports = function(){
	const User = mongoose.model("User")
	userStrat();

	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id: id
		}, function(err, user) {
			done(err, user);
		});
	});
}