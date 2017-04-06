const passportSocketIo = require("passport.socketio");

const UserConfig = require('./user')
const GroupsConfig = require('./groups')
const roastApi = require('../controllers/roasts.controller')
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
		socket.on('roast', (data,fn) => {
			roastApi.create(data, fn)
			.then(res => {
				return roastApi.feed(data.location.id)
			})
			.then(res => {
				io.to(`${data.location.where}/${data.location.id}`).emit('roasts', res)
			})
		})
	})
}

function onAuthorizeSuccess(data, accept){
	accept(null,true)
}

function onAuthorizeFail(){

}