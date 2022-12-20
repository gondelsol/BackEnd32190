const express = require('express');
const {Router} = express; 
const router = Router();
const { Contenedor } = require('../classes/Classes.js');
const producto = new Contenedor('./files/productos.json');

router.get('/', async (req, res) => {
    res.render('home');
    // const productos = await producto.getAll();
    // res.send(productos);
});


router.post("/productos", async (req, res) => {
    const idNuevoProducto = await producto.save(req.body);
    res.status(200).json({id: idNuevoProducto});
});

router.get('/productos', async (req, res) => {
    const productos = await producto.getAll();
    res.render('productos', {productos: productos, cantidad: productos.length});
});

module.exports = router; 