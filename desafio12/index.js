const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { MONGO_URI } = require('./src/config/globals');
// persistencia por filestore
const fileStore = require('session-file-store')(session);

// persistencia por MongoDb y Atlas
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// instanciamos express
const app = express();
const PORT = process.env.PORT || 3000;

// instanciamos socket io
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
app.set('socketio', io);

// instanciamos las rutas
const testRoute = require('./src/routes/test');
const fakerRoute = require('./src/routes/faker');
const indexRoute = require('./src/routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        mongoOptions: advancedOptions,
    }),
    // key: 'user_sid',
    secret: 'c0d3r',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60, // 1 segundo * 60 = 1 minuto
    }
}));

app.set('views', './views');
app.use('/', indexRoute);
app.use(express.static(__dirname + "/src/public"));
app.use('/api/productos-test', testRoute);
app.use('/test', fakerRoute);

// Conexión al puerto
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));
