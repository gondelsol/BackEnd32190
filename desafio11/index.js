const express = require('express');
const app = express();
const PORT = 8080;
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const testRoute = require('./src/routes/test');
const indexRoute = require('./src/routes/index');
const Normalizador = require('./src/models/normalizador');
const normalizer = new Normalizador();

// Importamos datos de conexiones
const { ProductDaoMongo } = require('./src/daos/productos/ProductoDaoMongo');
const { ChatDaoMongo } = require('./src/daos/chat/ChatDaoMongo');

const chat = new ChatDaoMongo();
const producto = new ProductDaoMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.use(express.static(__dirname + "/src/public"));

io.on('connection', async (socket) => {
    console.log('Un cliente se ha conectado');
    const productos = await producto.getAll();
    socket.emit('productos', productos);

    const messages = await chat.getAll();
    const data = normalizer.getDataNormalized(messages);
    // console.log("data", data, "FIN");
    socket.emit('messages', data);

    socket.on('new-producto', async (data) => {
        const idNuevoProducto = await producto.save(data);
        const productos = await producto.getAll();
        io.sockets.emit('productos', productos);
    });
    socket.on('new-message', async (data) => {
        const nuevoM = await chat.save(data);
        const messages = await chat.getAll();
        io.sockets.emit('messages', messages);
    });

});
app.use('/api/productos-test', testRoute);
app.use('/test', indexRoute);

// Conexión al puerto
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));
