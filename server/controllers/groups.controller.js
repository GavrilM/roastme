const express = require('express')

const Group = require('../models/group')
const User = require('../models/user')

module.exports.create = function(data, user, fn){
	data.users = [user._id]
	data.owner = user._id
	const group = new Group(data)
	group.save()
	.then((result) => {
		return User.update({
			_id: user._id
		}, {
			$addToSet: {
				groups: result._id
			}
		})
	})
	.then((result) => {
		fn(result)
	})
	.catch(err => {
		console.log(err)
		fn(null)
	})
}