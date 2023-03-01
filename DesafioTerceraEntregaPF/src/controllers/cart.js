const CartService = require('../services/cart.service');
const cart = new CartService();
const { sendMailOrder } = require('../utils/nodemailer');

const createCart = async (req, res) => {
    const idCart = await cart.save(req.body);
    res.status(200).json({id: idCart});
}

const deleteCart = async (req, res) => {
    const id = req.params.id;
    await cart.deleteById(id);
    res.send("Carrito eliminado");
}

const getCart = async (req, res) => {
    try {
        const id = req.params?.id ?? null;
        // console.log(id);
        let products = [];
        if(id == null) {
            products = await cart.getAll();
        }
        else {
            products = await cart.getById(id);
            // console.log(products);
            if(products === null) {
                throw new Error('carrito no encontrado');
            }
        }
        res.send(products);
    } catch (error) {
        res.send({error: error.message})
    }
}

const getProductsCart = async (req, res) => {
    try {
        const id = req.params.id;
        const cartFound = await cart.getById(id);
        if(cartFound === null) {
            throw new Error('carrito no encontrado');
        }
        res.send(cartFound.products ?? cartFound.data.products);        
    } catch (error) {
        res.status(200).json({error: error.message})
    }
}

const addProductCart = async (req, res) => {
    const idCart = req.params.id;
    const { products } = req.body;
    try {
        const cartFound = await cart.getById(idCart);
        if(cartFound === null) {
            throw new Error('carrito no encontrado');
        }
        const data = await cart.addProduct(idCart, products);
        if(data.success === false) {
            throw new Error(data.error);
        }
        res.send({
            success: true,
            message: "Productos agregados"
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
}

const deleteProductCart = async (req, res) => {
    const idCart = req.params.id;
    const idProd = req.params.idProd;
    try {
        const cartFound = await cart.getById(idCart);
        if(cartFound === null) {
            throw new Error('carrito no encontrado');
        }

        // await cart.deleteProduct(idCart, idProd);
        const data = await cart.deleteProduct(idCart, idProd);
        if(data.success === false) {
            throw new Error(data.error);
        }
        res.send({
            success: true,
            message: "Producto eliminado"
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }
}

const deleteOneProductCart = async (req, res) => {
    const idCart = req.params.id;
    const idProd = req.params.idProd;
    try {
        const cartFound = await cart.getById(idCart);
        if(cartFound === null) {
            throw new Error('carrito no encontrado');
        }

        // await cart.deleteProduct(idCart, idProd);
        const data = await cart.deleteProductOne(idCart, idProd);
        if(data.success === false) {
            throw new Error(data.error);
        }
        res.send({
            success: true,
            message: "Producto eliminado"
        });
    } catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }
}
const getCantProductsCart = async (req, res) => {
    try {
        const id = req.params.id;
        const cartFound = await cart.getById(id);
        if(cartFound === null) {
            throw new Error('carrito no encontrado');
        }
        // console.log("carrito", cartFound);
        res.send({
            success: true,
            cant: cartFound.products.length
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const checkoutCart = async (req, res) => {
    const logger = req.app.get('logger');
    try {
        const id = req.params.id;
        const cartFound = await cart.getById(id);
        if(cartFound === null) {
            throw new Error('carrito no encontrado');
        }
        if(cartFound.products.length === 0) {
            throw new Error('carrito vacío');
        }
        // logger.info(id);
        const data = await cart.deleteById(id);
        if(data.success === false) {
            throw new Error(data.error);
        }
        const cartCreated = await cart.save({user: req.user.id});
        // logger.info("User cart");
        // logger.info(req.user.cart);
        const mailOptions = {
            user: req.user,
        }
        const infoMail = await sendMailOrder(mailOptions);
        if(infoMail.success === false) {
            throw new Error(infoMail.error);
        }

        res.send({
            success: true
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createCart, deleteCart, getCart, getProductsCart, addProductCart,
    deleteProductCart, getCantProductsCart, deleteOneProductCart, checkoutCart
}