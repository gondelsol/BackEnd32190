const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;
const productosRouter = require('./routes/productosRouter');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
// app.set('views', './views');

app.use('/', productosRouter);

app.use(express.static(__dirname + "/public"));

// Conexión al puerto
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));