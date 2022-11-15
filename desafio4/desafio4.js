const { Contenedor} = require('./Classes.js')
const {app} = require('./Index.js')
const { error} = require('console');
const { Router } = require('express');
const { generateKey } = require('crypto');
const router = Router()

const indexRouter = require('./routes/indexRouter.js');
const productRouter = require ('./routes/productRouter.js')


const ruta = './products.txt'


const product1 = {
    nombre: 'taza',
    precio: 3
};

const product2 = {
    nombre: 'jarra',
    precio: 40
};

const product3 = {
    nombre: 'botella',
    precio: 50
};

const product4 = {
    nombre: 'cuchillo',
    precio: 65
};

const product5 = {
    nombre: 'tenedor',
    precio: 895
};

const product6 = {
    nombre: 'cuchara',
    precio: 36
}


async function main() {

  // const usuario = new Contenedor(ruta);

    //await usuario.deleteAll();
    //await usuario.save(product1);
    //await usuario.save(product5);
    //await usuario.save(product3);
    //await usuario.save(product4);
    //await usuario.save(product6);
    //await usuario.save(product2);
    //    await usuario.getById(5);
    //arrProducts = await usuario.getAll();
    //console.log(arrProducts)


    //app.use('/', indexRouter);
    //app.use('/api/productos', productRouter);

    //app.use(express.json());
    

    //app.use('/api/productos', productRouter);

    /*
    app.get('/', (req, res) => {
        res.send('Joaquin Gonzalez del Solar\nDesafio entregable N° 4')
    })

    // Devuelve todos los productos
    app.get('/api/productos', async (req, res) => {
        res.json(arrProducts)
    })

    //devuelve un producto segun su ID
    app.get('/api/productos/:id', async (req, res) => {
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
    app.post('/api/productos/:id', (req, res)=> {
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
    app.put('/api/productos/:id', async (req, res) => {
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
    app.delete('/api/productos/:id', async (req, res) => {
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

}

main();