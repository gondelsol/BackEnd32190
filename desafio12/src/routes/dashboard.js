const express = require('express');
const { Router } = express;
const router = Router();
const path = require("path");
function auth(req, res, next) {
    if (!req.session.user || !req.cookies.user_sid) {
        res.redirect('/login');
    }
    next();
}

router.get('/login', (req, res) => {
    res.send("HOLA");
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
    req.session.destroy( err => {
        if(err) throw err;
        res.send('Has cerrado sesión');
    });
});

module.exports = router;