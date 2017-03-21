const http = require('http')
const express = require('./server/')

const app = express()

const server = http.createServer(app)
server.listen(process.env.PORT, process.env.IP, () => {
	console.log("Server listening on port 3000")
})
