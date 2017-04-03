const http = require('http')
const express = require('./server/')
const socket = require('socket.io')

const ioConfig = require('./server/sockets/')

const app = express()

const server = http.createServer(app)
const io = socket(server)

ioConfig(io)

server.listen(process.env.PORT || 3000, () => {
	console.log("Server listening on port 3000")
})
