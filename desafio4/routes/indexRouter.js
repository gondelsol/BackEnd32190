const express = require('express');
const {Router} = express;
const router = Router();

router.get('/', (req, res)=>{
    res.send('index del desafio 4')
})

module.exports = router;



