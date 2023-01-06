const express = require('express');
const { Router } = express;
const router = Router();
const path = require("path");

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../public','/faker.html'));
});

module.exports = router;