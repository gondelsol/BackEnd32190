const express = require('express');
const {Router} = express;
const router = Router();


//const { Contenedor} = require('../Classes.js')
//const {app} = require('./Utils.js')


//const ruta = './products.txt'
//const usuario = new Contenedor(ruta);

// Devuelve todos los productos
router.get('/', async (req, res) => {
    res.json({"nombre": "'joaquin'" })
})

/*
//devuelve un producto segun su ID
app.get('/:id', async (req, res) => {
    const num = req.params.id
    if (isNaN(num)) {
        return res.json({
            error: "El parametro ingresado no es un numero"
        })
    }
    if (num > arrProducts.length) {
        return res.json({
            error: "El parametro ingresado esta fuera de rango"
        })
    }
    usuario.getById(num)
    res.json(arrProducts[num - 1])
})

//Recibe y actualiza un producto según su id.
app.post('/:id', (req, res)=> {
    const num = req.params.id
    if (isNaN(num)) {
        return res.json({
            error: "El parametro ingresado no es un numero"
        })
    }
    if (num > arrProducts.length) {
        return res.json({
            error: "El parametro ingresado esta fuera de rango"
        })
    }
    usuario.actualizar() //ver esta linea #{$clave}
    res.json(arrProducts)
})


// recibe y actualiza un producto según su id
app.put('/:id', async (req, res) => {
    const num = req.params.id
    if (isNaN(num)) {
        return res.json({
            error: "El parametro ingresado no es un numero"
        })
    }
    if (num > arrProducts.length) {
        return res.json({
            error: "El parametro ingresado esta fuera de rango"
        })
    }
    usuario.save() //ver esta linea
    arrProducts = await usuario.getAll()
    res.json(arrProducts)
})

//Borra un producto
app.delete('/:id', async (req, res) => {
    const num = req.params.id
    if (isNaN(num)) {
        return res.json({
            error: "El parametro ingresado no es un numero"
        })
    }
    if (num > arrProducts.length) {
        return res.json({
            error: "El parametro ingresado esta fuera de rango"
        })
    }
    usuario.deletById(num)
    res.json(arrProducts)
})

*/
module.exports = router;