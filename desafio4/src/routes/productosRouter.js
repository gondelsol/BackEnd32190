const express = require('express');
const {Router} = express; 
const router = Router();
const { Contenedor } = require('../classes/Classes.js');
const producto = new Contenedor('./src/files/productos.json');

router.get('/', async (req, res) => {
    const productos = await producto.getAll();
    res.send(productos);
});

router.get('/:id', async (req, res) => {
    producto.getById(req.params.id)
    .then(response => {
        if(response === null) {
            throw new Error('producto no encontrado');
        }
        res.send(response)
    })
    .catch(error => res.send({error: error.message}));
});

router.post("/", async (req, res) => {
    const idNuevoProducto = await producto.save(req.body);
    res.status(200).json({id: idNuevoProducto});
});
 
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    // console.log(data);
    const resProducto = await producto.updateById(id, data);

    res.send("Producto actualizado: " + JSON.stringify(resProducto));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await producto.deleteById(id);
    res.send("Producto eliminado");
})

module.exports = router; 