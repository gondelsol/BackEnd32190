const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const config = require('./src/config/globals');

// traemos el archivo de configuracion de winston
const { createLogger } = require('./src/config/winston.config');
const logger = createLogger('PROD');

// instanciamos passport
const passport = require('passport');
const { initializePassport } = require('./src/config/passport.config');
// persistencia por MongoDb y Atlas
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// instanciamos express
const app = express();

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
const infoRoute = require('./src/routes/info');
const apiRoute = require('./src/routes/api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.MONGO_URI,
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

app.use((req, res, next) => {
    logger.info(`${req.method} at ${req.path}`);
    next();
});

initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.set('views', './views');
app.set("logger", logger);

app.use('/', indexRoute);
app.use(express.static(__dirname + "/src/public"));
app.use('/api/productos-test', testRoute);
app.use('/test', fakerRoute);
app.use('/info', infoRoute);
app.use('/api', apiRoute);
app.use("*", (req, res) => {
    const error_message = `Ruta ${req.originalUrl} método ${req.method} no implementada`;
    logger.warn(error_message)
    res.status(404).json({"message": error_message})
});

const startServer = () => {
    httpServer.listen(puerto, () => {
        logger.info(`Escuchando port: ${httpServer.address().port} en proceso ID: (${process.pid})`); 
    });

    httpServer.on('error', (err) => logger.error(err));
}

const puerto = config.argv.p ? config.argv.p : config.argv._.length > 0 ? config.argv._[0] : 8080
const modo = config.argv.modo || 'fork';


if (modo !== 'fork'){
    if (cluster.isPrimary) {
        logger.info(`Proceso principal ID:(${process.pid})`)
        for(let i = 0; i <  core.cpus().length; i++) {
            cluster.fork();
        }
    
        cluster.on('exit', (worker) => {
            cluster.fork();
        });
    
    } else {
        startServer();
    }
} else {
    startServer();
}