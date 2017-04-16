const api = require('../controllers/users.controller')
const groupApi = require('../controllers/groups.controller')
const mongoose = require('mongoose')

const Users = mongoose.model('User')
const Groups = mongoose.model('Group')

module.exports = function(socket){
	socket.emit('currentUser', socket.request.user)
	socket.emit('currentGroup', socket.request.user.groups[0])
	socket.emit('allGroups', socket.request.user.groups)

	socket.on('emailChange', (email,fn) => {
		api.updateAccount(socket.request.user._id, {email})
		.then(res => {
			return Users.findOne({
				_id: socket.request.user._id
			})
		})
		.then(res => {
			fn(true)
			socket.emit('currentUser', res)	
		})
	})

	socket.on('passwordChange', (password,fn) => {
		api.updateAccount(socket.request.user._id, {password})
		.then(res => {
			fn(true)
		})
	})

	socket.on('search', (query, category) => {
		let choice = {}
		if(category === 'users'){
			choice = api;
		}
		else if(category === 'groups'){
			choice = groupApi
		}
		choice.search(query)
		.then(res => {
			socket.emit('searchResults', res)
		})
	})

	socket.on('invitation', (data,fn) => {
		api.invite({
			email: data[0],
			name: data[1].trim() + " " + data[2].trim(),
			initial: data[3]
		}, socket.request.user)
		.then(res => {
			fn(true)
		})
		.catch(err => {
			console.log(err)
			fn(false)
		})
	})
}