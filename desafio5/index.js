const express = require('express')
const app = express()
const path=require('path')
const PORT = 8080;
const productRouter = require ('./routes/productRouter.js')


//const indexRouter = require('./routes/indexRouter.js');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs')
//app.set('view', './views')
app.use('/', productRouter);

app.use(express.static(path.join(__dirname,'./public')))
console.log(path.join(__dirname,'./routes'));

//app.use('/api', indexRouter);
//app.use('/api/productos', productRouter);

const server = app.listen(PORT, () => {
    console.log(`The server is listening to port ${server.address().port}/`)
})


server.on('error', error => console.log('There is an error' + error))

module.exports={app}