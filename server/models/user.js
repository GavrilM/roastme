const mongoose = require("mongoose")
const Groups = require('./group')
const util = require("../lib/util")

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
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase:true
	},
	displayName: {
		type: String,
		required: true,
		trim: true
	},
	invites: {
		type: Number,
		default: 7
	},
	points: {
		type: Number,
		default: 100
	},
	groups: Array,
	initial: String,
	resetToken: String,
	resetExpires: Date
})

user.index({displayName: 'text'}, {username: 'text'})

user.pre('validate', function(next){
	Groups.findOne({
		addCode: this.initial
	})
	.then(res => {
		if(!res){
			next(new Error('Invalid Code'))
			return
		}
		this.groups = [{
			owner: res.owner,
			name: res.name,
			_id: res._id,
		}]
		return userModel.findOne({
			username: this.username
		})
	})
	.then(res => {
		if(res){
			this.username += '.'+util.makeid(3)
		}
		this.password = util.hash(this.password)
		next()
	})
	.catch(err => {
		console.log('err', err)
		next(err)
	})
})

user.methods.authWithPassword = function(password){
	return util.hash(password) === this.password
}

const userModel = mongoose.model("User", user)

module.exports = userModel

