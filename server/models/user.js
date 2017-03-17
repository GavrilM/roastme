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
	roastsRecieved : Array
})

user.pre('save', function(next){
	this.password = hash(password)
})

user.methods.authWithPassword = function(password){
	return hash(password) === this.password
}

mongoose.model("User", user)