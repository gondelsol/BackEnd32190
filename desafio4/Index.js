const express = require('express')
const app = express()
const path=require('path')


const indexRouter = require('./routes/indexRouter.js');
const productRouter = require ('./routes/productRouter.js')

const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'./public')))
console.log(path.join(__dirname,'./public'));

app.use('/api', indexRouter);
app.use('/api/productos', productRouter);

const server = app.listen(PORT, () => {
    console.log(`The server is listening to port http://localhost:${PORT}/`)
})


server.on('error', error => console.log('There is an error' + error))

module.exports={app}