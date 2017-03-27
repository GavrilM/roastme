const mongoose = require('mongoose')

const group = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	users: {
		type: Array,
		required: true
	}
})

module.exports = mongoose.model('Group', group)