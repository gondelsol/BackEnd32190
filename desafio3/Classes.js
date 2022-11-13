const fs = require('fs')

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta
    }

    //listar Productos

    async getAll() {
        try {
            const data1 = await fs.promises.readFile(this.ruta, 'utf-8');
            return JSON.parse(data1);
        } catch (error) {
            console.log('Error al leer el archivo json');
            console.log(error);
            return []
        }
    }


    async save(product) {
        const listaProductos = await this.getAll();
        let newId;
        if (listaProductos.length == 0) {
            newId = 1;
        } else {
            newId = listaProductos[listaProductos.length - 1].id + 1;
        }
        const newProduct = {
            id: newId,
            ...product
        }
        console.log('el nuevo producto es', newProduct)
        listaProductos.push(newProduct);
        await fs.promises.writeFile(this.ruta, JSON.stringify(listaProductos, null, 2))
        return newProduct;

    }

    async actualizar(id, product) {

        console.log('Actualizar elementos', id, product)

        try {
            const listaProductos = await this.getAll();
            const indexProduct = listaProductos.findIndex((o) => o.id == id);
            if (indexProduct == -1) {
                console.log('producto no encontrado')
                return 'Busqueda erronea'
            } else {
                listaProductos[indexProduct] = {
                    id,
                    ...product
                };
                await fs.promises.writeFile(this.ruta, JSON.stringify(listaProductos, null, 2));
            }
            console.log('lista actualizada')
            return {
                id,
                ...listaProductos
            }

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

            if (indexIndeseado == -1) {
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
        console.log('Se ejecuta la función borrar todo')
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2)) //guardo la nueva lista en el archivo
            //await this.getAll();
        } catch (error) {
            return 'no se pudo eliminar nada'
        }
    }
}

module.exports= {Contenedor}