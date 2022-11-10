const fs = require('fs')

try {
    fs.writeFileSync('./fyh.txt', new Date().toLocaleString())
    fs.appendFileSync('./fyh.txt', "\nJoaquin")

 } catch (err) {
    throw new Error ('error en la escritura de archivo' + err)

 }

 try {
    const fechayhora = fs.readFileSync('./fyh.txt', 'utf-8')
    console.log(fechayhora)

 } catch (err) {
    throw new Error ('error en la lectura del archivo' + err)

 }