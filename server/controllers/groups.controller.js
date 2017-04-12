const express = require('express')
const mongoose = require('mongoose')

const Group = require('../models/group')
const User = require('../models/user')
const Roasts = require('../models/roast')

module.exports.create = function(data, user){
	data.users = [user._id]
	data.owner = user._id
	const group = new Group(data)
	return group.save()
	.then((result) => {
		return User.update({
			_id: user._id
		}, {
			$addToSet: {
				groups: {
					_id: result._id,
					name: result.name,
					owner: result.owner
				}
			}
		})
	})
}

module.exports.remove = function(group){
	return Group.remove({
		_id: group._id
	})
	.then(res => {
		return User.update({}, {
			$pull: {
				groups: {_id: mongoose.Types.ObjectId(group._id) }
			}
		},{
			multi: true
		})
	})
	.then(res => {
		return Roasts.remove({
			"location.id": mongoose.Types.ObjectId(group._id)
		})
	})
}