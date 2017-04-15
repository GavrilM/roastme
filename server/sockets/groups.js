const roastApi = require('../controllers/roasts.controller')
const api = require('../controllers/groups.controller')
const mongoose = require('mongoose')

const User = mongoose.model("User")
const Groups = mongoose.model("Group")

module.exports = function(io, socket){
	socket.on('createGroup', (data,fn) => {
		api.create(data, socket.request.user)
		.then(res => {
			fn(res)
			return User.findOne({
				_id: socket.request.user._id
			})
		})
		.then(res => {
			socket.emit('allGroups', res.groups)	
		})
		.catch(err => {
			console.log(err)
			fn(null)
		})
		
	})

	socket.on('removeGroup', (data) => {
		api.remove(data)
		.then(res => {
			return User.findOne({
				_id: socket.request.user._id
			})
		})
		.then(res => {
			socket.emit('allGroups', res.groups)	
		})
	})

	socket.on('addUser', (userId,group, fn) => {
		api.addUser(userId, group)
		.then(res => {
			res ? fn(true) : fn(false)
			return Groups.findOne({
				_id: group._id
			})
		})
		.then(res => {
			return User.find({
				_id: { $in: res.users }
			})
		})
		.then(res => {
			console.log(`group/${group._id}`)
			io.to(`group/${group._id}`).emit('groupMembers', res)
		})
	})

	socket.on('leaveGroup', (group) => {
		api.leave(socket.request.user._id, group)
		.then(res => {
			return User.findOne({
				_id: socket.request.user._id
			})
		})
		.then(res => {
			socket.emit('allGroups', res.groups)	
			return Groups.findOne({
				_id: group._id
			})
		})
		.then(res => {
			return User.find({
				_id: { $in: res.users }
			})
		})
		.then(res => {
			console.log(`group/${group._id}`)
			io.to(`group/${group._id}`).emit('groupMembers', res)
		})
	})
}