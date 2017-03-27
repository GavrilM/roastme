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
	displayName: {
		type: String,
		required: true
	},
	invites: {
		type: Number,
		default: 2
	},
	groups: Array,
})

user.pre('save', function(next){
	this.password = hash(this.password)
	next()
})

user.methods.authWithPassword = function(password){
	return hash(password) === this.password
}

module.exports = mongoose.model("User", user)