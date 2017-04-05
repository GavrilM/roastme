const api = require('../controllers/roasts.controller')

module.exports = function(socket){
	socket.on('joinGroup', groupId => {
		socket.join(`group/${groupId}`)
		api.feed(groupId).then( res => {
			socket.emit('roasts', res)
		})
	})
}