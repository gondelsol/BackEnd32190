const express = require('express');
const { Router } = express;
const { fork } = require("child_process");

const router = Router();
const path = require("path");
//instanciamos normalizer
const Normalizador = require('../models/normalizador');
const normalizer = new Normalizador();

// Importamos datos de conexiones
const { ProductDaoMongo } = require('../daos/productos/ProductoDaoMongo');
const { ChatDaoMongo } = require('../daos/chat/ChatDaoMongo');
const { UserDaoMongo } = require('../daos/user/UserDaoMongo');
const passport = require('passport');

const chat = new ChatDaoMongo();
const producto = new ProductDaoMongo();

function auth(req, res, next) {
    // console.log(req.user);
    if (req.user) {
        return res.redirect('/');
    }
    next();
}
router.get('/', (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    // console.log(req.session);

    const io = req.app.get('socketio');
    io.on('connection', async (socket) => {
        // console.log('Un cliente se ha conectado');
        const productos = await producto.getAll();
        socket.emit('productos', productos);
    
        const messages = await chat.getAll();
        const data = normalizer.getDataNormalized(messages);
        // console.log("data", data, "FIN");
        socket.emit('messages', data);

        // console.log(req.session.user.username);
        //Envío datos de la sesión
        const username = req.user.username;
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
router.post('/login', passport.authenticate('login', { failureRedirect: '/errorLogin' }), (req, res) => {
    res.redirect('/');
});

router.get('/signup', auth, (req, res) => {
    res.sendFile(path.join(__dirname,'../public','/auth/signup.html'));
});
router.post('/signup', passport.authenticate('signup', { failureRedirect: '/errorSignUp'}), (req, res) => {
    res.redirect('/login');
})

router.get('/logout', (req, res) => {
    if(!req.user){
        return res.redirect('/login');
    }
    if (req.session) {
        req.session.destroy(() => {
            req.session = null
        });
    }
    res.sendFile(path.join(__dirname,'../public','/auth/logout.html'));
});

router.get('/errorSignUp', (req, res) => {
    res.sendFile(path.join(__dirname,'../public','/auth/errorSignUp.html'));
});

router.get('/errorLogin', (req, res) => {
    res.sendFile(path.join(__dirname,'../public','/auth/errorLogin.html'));
});


router.get('/api/randoms', (req, res) => {
    const repeticiones = req.query.cant || 100000000;
    const numerosFork = fork("./src/utils/random");

    numerosFork.on("message", (result) => {
        return res.status(200).send(result);
    });

    numerosFork.send(repeticiones); // la cantidad de iteraciones
})
module.exports = router;