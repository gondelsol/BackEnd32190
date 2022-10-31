const fs = require('fs')

const route = './products.txt';


const product1 = {
    title: 'wine',
    price: 350,
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD-9DmeKcEqPd8efhRhZP5M1Zh-RbSO95jR1QeckkBk9QfW7bbt1Mg0wiLXROQ8u4FmgM&usqp=CAU',
    //id: 1
};
const product2 = {
    title: 'water',
    price: 200,
    thumbnail: 'https://carrefourar.vtexassets.com/arquivos/ids/171464/7798065730033_02.jpg?v=637468539505070000',
    //id: 2
};
const product3 = {
    title: 'gaseosa',
    price: 350,
    thumbnail: 'https://static8.depositphotos.com/1020618/980/i/450/depositphotos_9805108-stock-photo-glass-of-cola.jpg',
    //id: 3
}
const product4 = {
    title: 'chizitos',
    price: 350,
    thumbnail: 'https://statics.dinoonline.com.ar/imagenes/large_460x460/2551123_l.jpg',
    //id: 4
}

const product5 = {
    title: 'chips',
    price: 350,
    thumbnail: 'https://i.blogs.es/5c1a48/patatas-chips-en-microondas/840_560.jpg',
    //id: 5
}

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta
    }

    async getAll() {
        try {
            let data1 = await fs.promises.readFile(route, 'utf-8');
            return await JSON.parse(data1);
        } catch (err) {
            console.log('The file does not exist');
            return [];
        }
    }

    async save(product) {
        console.log('saving product')
        const arrProducts = await this.getAll();
        let newId;
        if (arrProducts.length == 0) {
            newId = 1;
        } else {
            newId = arrProducts[arrProducts.length - 1].id + 1;
        }
        console.log('The new Id is', newId)
        const newProduct = {
            id: newId,
            ...product
        }
        arrProducts.push(newProduct);
        await fs.promises.writeFile(this.ruta, JSON.stringify(arrProducts, null, 2))
        await this.getAll();
        console.log(arrProducts);
    }

    async getById(idSearch) {
        console.log('serching product');
        try {
            const arrProducts = await this.getAll();
            const indexProduct = arrProducts.findIndex((o) => o.id == idSearch)
            if (indexProduct == -1) {
                console.log('Product did not find');
                return 'ERROR TO SEARCH BY ID';
            } else {
                // const busqueda = arrProducts[indexProduct];
                console.log('Product found', arrProducts[indexProduct])
                return 'finish';
            }

        } catch (err) {
            console.log('search error');
        }
    }

    async deletById(idDelet) {                  //TENGO PROBLEMAS PARA GUARDAR LA NUEVA LISTA
        console.log('Delet element by id', idDelet);
        try {
            const arrProducts = await this.getAll();
            const indexDelet = await arrProducts.findIndex((element) => element.id == idDelet)
            if (indexDelet == -1) {
                console.log('Product did not find because it is not in the list');
                return 'ERROR TO DELETE BY ID';
            } else {
                const newList = arrProducts.filter(item => item.id != idDelet);
                console.log('New List', newList);
                await fs.promises.writeFile(this.route, JSON.stringify(newList, null, 2));
                return 'finish';
            }
        }
        catch (err) {
            console.log('Something did wrong to delet...');
            return;
        }

    }

    async deleteAll() {
        console.log('Cleaning the list')
        try {
            await fs.promises.writeFile(this.route, '[]');
            await this.getAll();
        }
        catch (err) {
            return 'Nothing was deleted'
        }
    }


}

async function main() {
    const usuario = new Contenedor(route);

//    await usuario.save(product1);
//    await usuario.save(product3);
//    await usuario.getById(3);
    await usuario.deletById(2);
    await usuario.deleteAll();

}

main();