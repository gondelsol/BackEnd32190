const express = require('express')

const app = express()

app.get("/", (req, res) => {
    res.send('<h1>"Hello World"</h1>');
});

let visitas = 0
app.get('/visitas', (req, res) => {
    visitas++
    res.send('La cantidad de visitas es ' + visitas)
})

app.get('/fyh', (req, res) => {
    res.send({ fyh: new Date().toLocaleString() })
})

const server = app.listen(8080, () => {
    console.log('escuchando en el 8080')
})
