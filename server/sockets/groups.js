const roastApi = require('../controllers/roasts.controller')
const api = require('../controllers/groups.controller')

module.exports = function(socket){
	socket.on('joinGroup', groupId => {
		socket.join(`group/${groupId}`)
		roastApi.feed(groupId).then( res => {
			socket.emit('roasts', res)
		})
	})

	socket.on('createGroup', (data,fn) => api.create(data, socket.request.user, fn))
}