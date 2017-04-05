const api = require('../controllers/users.controller')

module.exports = function(socket){
	socket.emit('currentUser', socket.request.user)
	socket.emit('currentGroup', socket.request.user.groups[0])
}