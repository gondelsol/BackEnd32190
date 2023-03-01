const cartRouterApi = require('./api/cart');
const productRouterApi = require('./api/product');
const userRouter = require('./api/user');
const publicRouter = require('./public/main');

module.exports = { cartRouterApi, productRouterApi, publicRouter, userRouter };