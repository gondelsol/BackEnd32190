const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hi Joaquin Gonzalez del Solar\nExpress Server')
})

app.get('/Inicio', (req, res) => {
    res.send('Pegina de inicio')
})
const server = app.listen(8080, ()=> {
    console.log('Servidor escuchando en el 8080')
})

server.on('error', error => console.log('Hubo un error' + error))