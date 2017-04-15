const mongoose = require('mongoose')
const util = require("../lib/util")

const group = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	addCode: {
		type: String,
		required: true
	},
	users: {
		type: Array,
		required: true
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
	},
	policy: {
		membersCanAdd: {
			type: Boolean,
			default: true
		}
	}
})

group.index({name: 'text'})

group.pre('validate', function(next){
	this.addCode = util.makeid(6)
	next()
})

module.exports = mongoose.model('Group', group)