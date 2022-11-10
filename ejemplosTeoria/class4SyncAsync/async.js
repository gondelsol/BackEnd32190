const fs = require('fs')

fs.readFile('./package.json', 'utf-8', (err, data) =>{
    if (err) {
        console.log('Hubo un error en la lectura')
        throw new Error ('Error en la lectura' + err)
    }

    console.log('La lectura fue existosa')

    const info = {
        contenidoStr: data,
        contenidoObj: JSON.parse(data),
        size: data.length

    }

    console.log(info)

    fs.writeFile('./info.txt', JSON.stringify(info, null, 2), err => {
        if (err) {
            console.log('Hubo un error en la escritura')
            throw new Error ('Error en la escritura' + err)
        }
        console.log('La escritura fue exitosa')
    })
})