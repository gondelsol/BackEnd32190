const express = require('express');
const {Router} = express; 
const router = Router();

router.get('/', (req, res) => {
    res.send('¡Index!');
});


module.exports = router;