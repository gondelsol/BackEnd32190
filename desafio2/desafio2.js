const fs = require('fs')

const ruta = './products.txt'


const product1 =
    {
        title: 'wine',
        price: 350,
        thumbnail:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD-9DmeKcEqPd8efhRhZP5M1Zh-RbSO95jR1QeckkBk9QfW7bbt1Mg0wiLXROQ8u4FmgM&usqp=CAU',
        //id: 1
    };
const product2 =   {
        title: 'water',
        price: 200,
        thumbnail:'https://carrefourar.vtexassets.com/arquivos/ids/171464/7798065730033_02.jpg?v=637468539505070000',
        //id: 2
    };
const product3 =   {
        title: 'gaseosa',
        price: 350,
        thumbnail:'https://static8.depositphotos.com/1020618/980/i/450/depositphotos_9805108-stock-photo-glass-of-cola.jpg',
        //id: 3
    }
    const product4 =    {
        title: 'chizitos',
        price: 350,
        thumbnail:'https://statics.dinoonline.com.ar/imagenes/large_460x460/2551123_l.jpg',
        //id: 4
    }

const product5 = {
    title: 'chips',
    price: 350,
    thumbnail:'https://i.blogs.es/5c1a48/patatas-chips-en-microondas/840_560.jpg',
    //id: 5
}

class Contenedor {
    constructor(ruta){
        this.ruta=ruta
    }

    async read() {
        try {
            const data1 = await fs.promises.readFile(ruta, 'utf-8');
            //console.log('LECTURA DE ARCHIVO')
            //console.log(data1)
            const listaJSON = JSON.parse(data1);
            console.log(listaJSON);
            return listaJSON;
        } catch (error) {
            console.error('Error al leer el JSON');
            console.error(error);
            return 'La lista de productos es' + error;
        }
    }

    async save (product) {
        const arrProducts = await this.read();
        let newId;
        if (arrProducts.length == 0) {
            newId=1;
        } else {
            newId= arrProducts[arrProducts.length - 1].id +1;
        }
        console.log('El nuevo ID es', newId)
        const newProduct = { id: newId, ...product}
        arrProducts.push(newProduct);
        await fs.promises.writeFile(this.ruta, JSON.stringify(arrProducts, null, 2))
        await this.read();
    }
/*

getById(2); //borro un elemento
getAll(); //tomo un elemento y lo muestro por pantalla
deletById(1); //borro un elemento del objeto
deleteAll(); // borro todos los elementos del objeto
*/



}

async function main () {
    const usuario = new Contenedor (ruta);

    await usuario.save(product1);
    //await usuario.read();
}

main();




