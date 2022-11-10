const fs = require('fs')

fs.promises.readFile('./info.txt', 'utf-8')
.then(data => {
    const info = JSON.parse(data)
    console.log(info)

    const pkjObj = info.contenidoObj
    pkjObj.author = 'CoderHouse'

    fs.promises.writeFile('./package.json.coder', JSON.stringify(pkjObj, null, 2))
    .then()
    .catch()


})
.catch(err => console.log('Error en la lectura'))