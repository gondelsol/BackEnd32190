const express = require('express');
const app = express();
const path = require('path');

const PORT = 8080;
const indexRouter = require('./src/routes/indexRouter');
const productosRouter = require('./src/routes/productosRouter');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'src/public')));
console.log(path.join(__dirname,'src/public'));
// console.clear();
app.use('/', indexRouter);
app.use('/api/productos', productosRouter);

// Conexión al puerto
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));