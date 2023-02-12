const express = require('express');
const { Router } = express;
const router = Router();
const path = require("path");


router.get('/', (req, res) => {
    const logger = req.app.get('logger');
    logger.info("HOLA");
    res.sendFile(path.join(__dirname,'../public','/faker.html'));
});

module.exports = router;