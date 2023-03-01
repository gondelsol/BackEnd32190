const express = require('express');
const { Router } = express; 
const router = Router();

const { 
    getProduct, saveProduct,
    updateProduct, deleteProduct
} = require('../../controllers/product');

const { checkAdmin } = require('../../middlewares/auth.js');


router.get('/:id?', getProduct);

router.post("/", checkAdmin, saveProduct);
 
router.put("/:id", checkAdmin, updateProduct);

router.delete("/:id", checkAdmin, deleteProduct);

module.exports = router; 