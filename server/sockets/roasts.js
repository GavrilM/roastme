const api = require('../controllers/roasts.controller')
const Groups = require('mongoose').model('Group')
const Users = require('mongoose').model('User')

module.exports = function(io, socket){

	socket.on('joinFeed', (loc,path,id) => {
		if(loc) socket.leave(loc)
		socket.join(`${path}/${id}`)
		socket.emit('room', `${path}/${id}`)

		let type
		if(path === 'group'){
			Groups.findOne({
				_id: id
			})
			.then(res => {
				delete res.users
				socket.emit('currentGroup', res)
			})
			type = 'group'
		}
		else if(path.substr(0,path.indexOf('/')) === 'user'){
			Users.findOne({
				username: id
			})
			.then(res => {
				delete res.password
				socket.emit('currentProfile', res)
			})
			type = 'user'
		}

		api.feed(type,id).then(res => sendRoasts(`${path}/${id}`,res))
	})

	socket.on('roast', (loc,data,fn) => {
		api.create(data, fn)
		.then(res => {
			return api.feed(data.location.where, data.location.id)
		})
		.then(res => sendRoasts(loc, res))
	})

	socket.on('vote', (loc,data) => {
		api.vote(data, socket.request.user._id)
		.then(res => {
			return api.feed(data.location.where, data.location.id)
		})
		.then(res => sendRoasts(loc, res))
	})

	socket.on('remove', (loc,data) => {
		api.remove(data)
		.then(res => {
			return api.feed(data.location.where, data.location.id)
		})
		.then(res => sendRoasts(loc, res))
	})

	function sendRoasts(loc,roasts) {
		io.to(loc).emit('roasts', roasts || [])
	}
}



// io.to(`${path}/${id}`).emit('roasts', res)