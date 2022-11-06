
const express = require('express')

const app = express()


const { error } = require('console');
const fs = require('fs');
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


class Contenedor {

    constructor(ruta) {
        this.ruta = ruta
    }

    //El método ok funciona ok

    async getAll() {

            try {
            const data1 = await fs.promises.readFile(ruta, 'utf-8');
            const listaJSON = JSON.parse(data1);
            //console.log(listaJSON);
            return listaJSON;
        } catch (error) {

            console.log('Error al leer el archivo json');
            console.log(error);
            return 'La lista de productos es: ' + error;
        }


    }
    //El metodo save fuciona ok

 async save(product) {
        const listaProductos = await this.getAll();
        let newId;
        if (listaProductos.length == 0) {
            newId = 1;
        } else {
            newId = listaProductos[listaProductos.length - 1].id + 1;
        }
        //console.log('El nuevo id es: ', newId)
        const newProduct = { id: newId, ...product }
        listaProductos.push(newProduct);
        await fs.promises.writeFile(this.ruta, JSON.stringify(listaProductos, null, 2))
        return newId;
        //await this.getAll();
    }

    //El metodo actualizar funciona ok

    async actualizar(id, product) {

        console.log('Actualizar elementos', id, product)

        try {
            const listaProductos = await this.getAll();
            const indexProduct = listaProductos.findIndex((o) => o.id == id);

            if (indexProduct == -1) {
                console.log('producto no encontrado')
                return 'Busqueda erronea'
            } else {
                listaProductos[indexProduct] = { id, ...product };
                await fs.promises.writeFile(this.ruta, JSON.stringify(listaProductos, null, 2));
            }
            console.log('lista actualizada')
            return { id, ...listaProductos }

        } catch (error) {
            console.log('Error en actualización')
        }
    }

    //El metodo getbyId funciona ok

    async getById(id) {

        console.log('buscar producto por id')

        try {
            const listaProductos = await this.getAll();
            const indexProduct = listaProductos.findIndex((o) => o.id == id);

            if (indexProduct == -1) {
                console.log('producto no encontrado')
                return 'Busqueda erronea'
            } else {
                const busqueda = listaProductos[indexProduct];
                console.log('El producto buscado es', busqueda)
            }
            return 'La busqueda terminó';

        } catch (error) {
            console.log('Error en busqueda')
        }
    }

    async deletById(id) {

        console.log('eliminar archivo por id')

        try {
            const listaProductos = await this.getAll();
            const indexIndeseado = await listaProductos.findIndex((element) => element.id == id)

            if (indexIndeseado == -1 ) {
                console.log('El producto indeseado que busca no está en la lista')
                return 'EL ELEMENTO QUE DESEA ELIMINAR NO SE ENCONTRÓ'
            } else {
                const newList = listaProductos.filter(item => item.id != id);
                await fs.promises.writeFile(this.ruta, JSON.stringify(newList, null, 2));
            }
        } catch (error) {
            return 'no se pudo eliminar nada'
        }
    }

    async deleteAll() {
        console.log ('Se ejecuta la función borrar todo')
        try {
            await fs.promises.writeFile(this.ruta, '[]') //guardo la nueva lista en el archivo
            //await this.getAll();
        } catch (error) {
            return 'no se pudo eliminar nada'
        }
    }
}




async function main () {

    const usuario = new Contenedor(ruta);

    await usuario.deleteAll();
    await usuario.save(product1);
    await usuario.save(product5);
    await usuario.save(product3);
    arrProducts = await usuario.getAll();
    console.log(arrProducts)

    app.get('/', (req, res) => {
        res.send('Joaquin Gonzalez del Solar\nDesafio entregable N° 3')
    })

    app.get('/inicio', (req, res) => {
        res.send('Pagina de inicio')
    })

    app.get('/products', (req, res) => {
        res.send('Mostrar la lista de bazar')
        res.send(arrProducts)
    })

    app.get('/productsRandom', async (req, res) => {
        res.send('producto Aleatorio')
        const products = await usuario.getAll();
        const random = Math.floor(Math.round(Math.random()*products.length));
        res.send(products[random])
    })

}

main();


const PORT = 8080;

const server = app.listen(PORT, ()=> {
    console.log(`The server is listening to port http://localhost:${PORT}/`)
})

server.on('error', error => console.log('There is an error' + error))