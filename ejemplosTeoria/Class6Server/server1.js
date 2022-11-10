const http = require ('http')
const server = http.createServer((mensaje, respuesta) => {
    respuesta.end('Hi Joaquin! How are you?\nHTTP Server')
})
const conection = server.listen(8080, () => {
    console.log('servidor escuchando a Joaquin')
})