const passportSocketIo = require("passport.socketio");

const UserConfig = require('./user')
const GroupsConfig = require('./groups')
const RoastsConfig = require('./roasts')
const sessionStore = require('../config/session')

module.exports = function(io){
	const users = {}
	io.use(passportSocketIo.authorize({
		cookieParser: require('cookie-parser'),
		key:          'express.sid',
		secret:       'roastmyass',
		store:        sessionStore,
		success:      onAuthorizeSuccess, 
		fail:         onAuthorizeFail,    
	}));

	io.on('connection', socket => {
		users[`${socket.request.user.username}`] = socket.id
		UserConfig(socket)
		GroupsConfig(io, socket, users)
		RoastsConfig(io, socket)
	})
}

function onAuthorizeSuccess(data, accept){
	accept(null,true)
}

function onAuthorizeFail(){

}