const express = require('express')
const app = express()
const path=require('path')
const { Contenedor} = require('./classes/classes')
const producto = new Contenedor('./files/products.json');

const PORT = 8080;
//const productRouter = require ('./routes/productRouter.js')
const {promises: fs} = require ('fs')

//app.use(express.json());
//app.use(express.urlencoded({extended: true}));


//app.use(express.static(path.join(__dirname,'./public')))
//console.log(path.join(__dirname,'./routes'));



//app.use('/api', indexRouter);
//app.use('/api/productos', productRouter);

app.engine('ejs', async (filePath, options, callback) => {
    try {
        const template = await fs.readFile(filePath)
        const html = template.toString()
                        .replace('^^titulo$$', options.titulo)
                        .replace('^^mensaje$$', options.mensaje)
                        .replace('^^autor$$', options.autor)
                        .replace('^^version$$', options.version)
                        .replace('^^nombre$$', options.nombre)
                        .replace('^^apellido$$', options.apellido)
                        .replace('^^fyh$$', options.fyh)
        
        return callback(null, html)
    } catch (err) {
        return callback(err)
    }
})

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {

    const obj = {
        titulo: 'vamos',
        mensaje: 'bokita',
        autor: req.params.autor,
        version: '123'
    }

    res.render('home', obj)
})

app.get('/products', (req, res) => {

    const obj = {
        nombre: 'marcelo',
        apellido: 'gallardo',
        fyh: new Date().toLocaleString()
    }

    res.render('products', obj)
})

const server = app.listen(PORT, () => {
    console.log(`The server is listening to port ${server.address().port}/`)
})


server.on('error', error => console.log('There is an error' + error))

module.exports={app}