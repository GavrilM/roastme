const mongoose = require('mongoose')

const group = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	users: {
		type: Array,
		required: true
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
	}
})

module.exports = mongoose.model('Group', group)