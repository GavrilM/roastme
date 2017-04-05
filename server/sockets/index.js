const passportSocketIo = require("passport.socketio");

const UserConfig = require('./user')
const GroupsConfig = require('./groups')
const sessionStore = require('../config/session')

module.exports = function(io){
	io.use(passportSocketIo.authorize({
		cookieParser: require('cookie-parser'),
		key:          'express.sid',
		secret:       'roastmyass',
		store:        sessionStore,
		success:      onAuthorizeSuccess, 
		fail:         onAuthorizeFail,    
	}));

	io.on('connection', socket => {
		console.log('connected')

		UserConfig(socket)
		GroupsConfig(socket)
	})
}

function onAuthorizeSuccess(data, accept){
	accept(null,true)
}

function onAuthorizeFail(){

}