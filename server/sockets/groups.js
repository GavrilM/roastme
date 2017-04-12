const roastApi = require('../controllers/roasts.controller')
const api = require('../controllers/groups.controller')

const User = require("mongoose").model("User")
const Groups = require("mongoose").model("Group")

module.exports = function(socket){
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
}