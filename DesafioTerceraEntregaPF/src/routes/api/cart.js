const express = require('express');
const {Router} = express; 
const router = Router();
const cartController =  require('../../controllers/cart.js');

const { checkAdmin } = require('../../middlewares/auth.js');

// Crea un carrito y devuelve su id
router.post("/",checkAdmin, cartController.createCart);

// Vacía un carrito y lo elimina
router.delete("/:id", cartController.deleteCart);

// Permite listar todos los carritos o un carrito en particular
router.get('/:id?', cartController.getCart);

// Permite listar todos los productos guardados en el carrito
router.get('/:id/products', cartController.getProductsCart);

// Permite incorporar productos al carrito por su id de producto
router.post('/:id/products', cartController.addProductCart);

// Elimina productos del carrito por su id de producto
router.delete('/:id/products/:idProd', cartController.deleteProductCart);

// Elimina un producto del carrito por su id de producto
router.delete('/:id/products/:idProd/one', cartController.deleteOneProductCart);

// Devuelve la cantidad de productos que hay en el carrito
router.get('/:id/products/count', cartController.getCantProductsCart);

// Generamos el checkout del carrito
router.get('/:id/checkout', cartController.checkoutCart);

module.exports = router;