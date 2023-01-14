const express = require('express');
const { Router } = express;
const router = Router();
const path = require("path");
//instanciamos normalizer
const Normalizador = require('../models/normalizador');
const normalizer = new Normalizador();

// Importamos datos de conexiones
const { ProductDaoMongo } = require('../daos/productos/ProductoDaoMongo');
const { ChatDaoMongo } = require('../daos/chat/ChatDaoMongo');

const chat = new ChatDaoMongo();
const producto = new ProductDaoMongo();

function auth(req, res, next) {
    if (req.session.user) {
        return res.redirect('/');
    }
    next();
}
router.get('/', (req, res) => {
    console.log(req.session.user);

    if (!req.session.user) {
        return res.redirect('/login');
        // console.log(req.session.user);
    }

    const io = req.app.get('socketio');
    io.on('connection', async (socket) => {
        console.log('Un cliente se ha conectado');
        const productos = await producto.getAll();
        socket.emit('productos', productos);
    
        const messages = await chat.getAll();
        const data = normalizer.getDataNormalized(messages);
        // console.log("data", data, "FIN");
        socket.emit('messages', data);

        //Envío datos de la sesión
        const username = req.session.user;
        socket.emit('user', username);
    
        socket.on('new-producto', async (data) => {
            const idNuevoProducto = await producto.save(data);
            const productos = await producto.getAll();
            io.sockets.emit('productos', productos);
        });
        socket.on('new-message', async (data) => {
            const nuevoM = await chat.save(data);
            const messages = await chat.getAll();
            const dataN = normalizer.getDataNormalized(messages);

            io.sockets.emit('messages', dataN);
        });
    });
    res.sendFile(path.join(__dirname,'../public','/index.html'));
});

router.get('/login', auth, (req, res) => {
    res.sendFile(path.join(__dirname,'../public','/auth/login.html'));
});
router.post('/login', async (req, res) => {
    const {username} = req.body;
    req.session.user = username;
    // console.log(req.session.user);
    res.redirect('/');
});

   
router.get('/con-session', (req, res) => {
    if(req.session.contador){
        req.session.contador++; // incrementa el contador
        res.send(`Ud ha visitado el sitio ${req.session.contador} veces`);
    } 
    else {
        req.session.contador = 1; // inicializa el contador
        req.session.user = 'Alex';
        res.send(`Bienvenido a nuestro sitio`);
    }
});
router.get('/logout', (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    }
    if (req.session) {
        req.session.destroy(() => {
            req.session = null
        });
    }
    res.sendFile(path.join(__dirname,'../public','/auth/logout.html'));
});

module.exports = router;