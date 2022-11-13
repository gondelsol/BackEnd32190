const express = require('express')
const app = express()

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`The server is listening to port http://localhost:${PORT}/`)
})

server.on('error', error => console.log('There is an error' + error))

module.exports={app}