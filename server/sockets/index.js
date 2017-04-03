const passportSocketIo = require("passport.socketio");
const RoastsConfig = require('./roasts')
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
		RoastsConfig(socket)
	})
}

function onAuthorizeSuccess(data, accept){
	console.log('Auth Success')
	accept(null,true)
}

function onAuthorizeFail(){
	console.log('Failure')
}