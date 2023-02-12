const express = require('express');
const { Router } = express;
const router = Router();
const path = require("path");


router.get('/randoms', (req, res) => {
    const logger = req.app.get('logger');

    //Cantidad de iteraciones
    const cantidadIteraciones = req.query.cant || 100000000;

    const randomFork = fork('./utils/random.js')
    
    randomFork.on('message', (result) => {
        //Aca se obtiene la respuesta del proceso secundario
        return res.status(200).send(result);
    })
    
    //Aca se envia el pedido al proceso secundario
    randomFork.send(cantidadIteraciones);
    logger.info(`Random ok`)
});

module.exports = router;