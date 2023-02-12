const express = require('express');
const { Router } = express;
const router = Router();
// Instanciamos Faker
const { faker } = require('@faker-js/faker');

const fs = require('fs');

router.get('/', async (req, res) => {
    const logger = req.app.get('logger');

    try {
        let dataOutput = [];
        for(let i = 0; i < 5; i++){
            let title = faker.commerce.productName();
            let price = faker.commerce.price();
            let thumbnail = faker.image.avatar();
            dataOutput.push({title,price,thumbnail});
        }
        res.send(dataOutput);
    }
    catch(err){
        logger.error(err.message);
        res.status(500).send(err);
    }
});

module.exports = router;