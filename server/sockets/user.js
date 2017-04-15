const api = require('../controllers/users.controller')
const groupApi = require('../controllers/groups.controller')
const Users = require('mongoose').model('User')
const Groups = require('mongoose').model('Group')

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
}