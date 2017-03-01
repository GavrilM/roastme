const mongoose = require("mongoose")
const hash = require("../lib/util").hash

const user = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
		unique: true,
		required: true,
		match: /.+\@.+\..+/
	},
	password: {
		type: String,
		required: true,
		validate:[
			function(p){
				return p.length > 5
			},
			'Password too short'
		]
	},
	displayName: String,

})

user.methods.authWithPassword = function(password){
	return hash(password) === this.password
}

module.exports = mongoose.Model("User", user)