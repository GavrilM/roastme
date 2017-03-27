const express = require('express')

const Group = require('../models/group')
const User = require('../models/user')

module.exports.new = function(req,res){
	if(!req.user) 
		res.status('401').send("Unauthorized")
	else{
		req.body.users = [req.user._id]
		const group = new Group(req.body)
		group.save()
		.then((result) => {
			console.log(result)
			return User.update({
				_id: req.user._id
			}, {
				$addToSet: {
					groups: result._id
				}
			})
		})
		.then((result) => {
			res.send(result)
		})
		.catch(err => {
			console.log(err)
			res.status('500').send(err)
		})
	}

}