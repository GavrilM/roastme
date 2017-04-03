const api = require('../controllers/roasts.controller')

module.exports = function(socket){
	socket.on('roasts', api.feed)
}