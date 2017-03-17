const passport = require('passport'),
	mongoose = require('mongoose')

const userStrat = require("./strategies/users")

module.exports = function(){
	const User = mongoose.model("User")
}