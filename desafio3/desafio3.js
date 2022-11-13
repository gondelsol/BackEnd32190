const {Contenedor} = require('./Classes.js')
const {app} = require('./Utils.js')
const {error} = require('console');

const ruta = './bazar.txt'


const product1 = {
    //id: 1,
    nombre: 'taza',
    precio: 3
};

const product2 = {
    //id: 2,
    nombre: 'jarra',
    precio: 40
};

const product3 = {
    //id: 3,
    nombre: 'botella',
    precio: 50
};

const product4 = {
    //id: 4,
    nombre: 'cuchillo',
    precio: 65
};

const product5 = {
    //id: 5,
    nombre: 'tenedor',
    precio: 895
};

const product6 = {
    //id: 6,
    nombre: 'taza',
    precio: 36
}


async function main() {

    const usuario = new Contenedor(ruta);

    await usuario.deleteAll();
    await usuario.save(product1);
    await usuario.save(product5);
    await usuario.save(product3);
    await usuario.save(product4);
    await usuario.save(product6);
    arrProducts = await usuario.getAll();
    console.log(arrProducts)

    app.get('/', (req, res) => {
        res.send('Joaquin Gonzalez del Solar\nDesafio entregable N° 3')
    })

    app.get('/inicio', (req, res) => {
        res.send('Pagina de inicio')
    })

    app.get('/products', async (req, res) => {
        res.send(arrProducts)
    })
/*
    app.get('/productos', async (request, response)=>{
        const products = await usuario.leer();
        response.send(products);
    });
    */

    app.get('/productsRandom', async (req, res) => {
        const random = Math.floor(Math.random() * arrProducts.length);
        res.send(arrProducts[random])
    })

}

main();
